/**
 * Test setup that intercepts fetch requests to record URLs for later downloading.
 */

import { writeFileSync, existsSync, mkdirSync, readFileSync, statSync, openSync, readSync, closeSync } from 'fs'
import { join } from 'path'
import rangeParser from 'range-parser'

const RECORD_FILE = 'data/fetch-urls.json'
const recordedUrls = new Set<string>()

// Store the original fetch
const originalFetch = globalThis.fetch

// Flag to control whether we're recording or using local files
const USE_LOCAL_DATA = process.env.USE_LOCAL_DATA === 'true'
const RECORD_URLS = process.env.RECORD_URLS === 'true'

if (RECORD_URLS) {
  console.log('📝 Recording fetch URLs...')

  // Override fetch to record URLs
  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url

    // Only record S3 URLs (our data sources)
    if (url.includes('s3.amazonaws.com')) {
      recordedUrls.add(url)
      console.log(`  📥 ${url}`)
    }

    return originalFetch(input, init)
  }
}

if (USE_LOCAL_DATA) {
  console.log('📂 Using local data files...')

  // Override fetch to use local files with range request support
  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url

    if (url.includes('s3.amazonaws.com')) {
      // Convert URL to local file path
      const urlObj = new URL(url)
      const localPath = join(
        process.cwd(),
        'data',
        urlObj.hostname,
        urlObj.pathname.slice(1)
      )

      console.log(`  📂 Loading from: ${localPath}`)

      if (existsSync(localPath)) {
        try {
          // Extract range header
          let rangeHeader: string | null = null
          if (init?.headers) {
            if (init.headers instanceof Headers) {
              rangeHeader = init.headers.get('range') || init.headers.get('Range')
            } else if (typeof init.headers === 'object') {
              rangeHeader = (init.headers as Record<string, string>)['range'] || (init.headers as Record<string, string>)['Range'] || null
            }
          }

          if (rangeHeader) {
            // Handle range request
            return await handleRangeRequest(localPath, rangeHeader)
          } else {
            // Handle full file request
            return await handleFullRequest(localPath)
          }
        } catch (error) {
          console.error(`  ❌ Error reading ${localPath}:`, error)
          return originalFetch(input, init)
        }
      } else {
        console.warn(`  ⚠️  Local file not found: ${localPath}`)
        // Fall back to original fetch
        return originalFetch(input, init)
      }
    }

    return originalFetch(input, init)
  }
}

// Helper to handle range requests with proper parsing
async function handleRangeRequest(localPath: string, rangeHeader: string): Promise<Response> {
  const stats = statSync(localPath)
  const range = rangeParser(stats.size, rangeHeader)

  if (range === -2 || range === -1) {
    throw new Error(`Invalid range header: "${rangeHeader}"`)
  }

  // Use the first range
  const { start, end } = range[0]!
  const length = end - start + 1

  // Read only the requested chunk
  const fd = openSync(localPath, 'r')
  const buffer = Buffer.alloc(length)
  readSync(fd, buffer, 0, length, start)
  closeSync(fd)

  const contentType = localPath.endsWith('.gz')
    ? 'application/gzip'
    : localPath.endsWith('.json') || localPath.endsWith('.jsonz')
    ? 'application/json'
    : 'application/octet-stream'

  return new Response(buffer, {
    status: 206,
    headers: {
      'Content-Type': contentType,
      'Content-Range': `bytes ${start}-${end}/${stats.size}`,
      'Content-Length': length.toString(),
    },
  })
}

// Helper to handle full file requests
async function handleFullRequest(localPath: string): Promise<Response> {
  const fileData = readFileSync(localPath)
  const contentType = localPath.endsWith('.gz')
    ? 'application/gzip'
    : localPath.endsWith('.json') || localPath.endsWith('.jsonz')
    ? 'application/json'
    : 'application/octet-stream'

  return new Response(fileData, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Content-Length': fileData.length.toString(),
      'Accept-Ranges': 'bytes',
    },
  })
}

// Save recorded URLs after tests complete
if (RECORD_URLS) {
  const recordFilePath = join(process.cwd(), RECORD_FILE)

  // @ts-expect-error - afterAll is available in vitest
  if (typeof afterAll !== 'undefined') {
    // @ts-expect-error
    afterAll(() => {
      if (recordedUrls.size > 0) {
        // Re-read the file right before writing to handle parallel test execution
        // This prevents race conditions where parallel test files overwrite each other
        if (existsSync(recordFilePath)) {
          try {
            const existing = JSON.parse(readFileSync(recordFilePath, 'utf-8')) as string[]
            existing.forEach(url => recordedUrls.add(url))
          } catch (error) {
            // Ignore parse errors, start fresh
          }
        }

        // Ensure data directory exists
        const dataDir = join(process.cwd(), 'data')
        if (!existsSync(dataDir)) {
          mkdirSync(dataDir, { recursive: true })
        }

        const urlArray = Array.from(recordedUrls).sort()
        writeFileSync(recordFilePath, JSON.stringify(urlArray, null, 2))
        console.log(`\n✅ Recorded ${urlArray.length} URLs to ${RECORD_FILE}`)
      }
    })
  }
}

export { recordedUrls }
