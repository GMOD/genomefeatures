/**
 * Test setup that intercepts fetch requests to record URLs for later downloading.
 */

import { writeFileSync, existsSync, mkdirSync, readFileSync } from 'fs'
import { join } from 'path'

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
  console.log('📂 Using local data files via Express server on http://localhost:3005')
  // Set global variable for story files to use the test server
  globalThis.LOCAL_DATA_SERVER = 'http://localhost:3005'
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
