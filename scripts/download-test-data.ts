#!/usr/bin/env tsx
/**
 * Downloads all recorded fetch URLs to the local data directory.
 *
 * Usage:
 *   yarn tsx scripts/download-test-data.ts
 */

import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs'
import { dirname, join } from 'path'

const RECORD_FILE = 'data/fetch-urls.json'

async function downloadFile(url: string, localPath: string) {
  try {
    console.log(`📥 Downloading: ${url}`)

    const response = await fetch(url)
    if (!response.ok) {
      console.error(`  ❌ Failed: ${response.status} ${response.statusText}`)
      return false
    }

    const buffer = Buffer.from(await response.arrayBuffer())

    // Ensure directory exists
    const dir = dirname(localPath)
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }

    writeFileSync(localPath, buffer)
    console.log(`  ✅ Saved to: ${localPath}`)
    return true
  } catch (error) {
    console.error(`  ❌ Error downloading ${url}:`, error)
    return false
  }
}

async function main() {
  if (!existsSync(RECORD_FILE)) {
    console.error(`❌ File not found: ${RECORD_FILE}`)
    console.error(`\nPlease run tests with RECORD_URLS=true first:`)
    console.error(`  RECORD_URLS=true yarn test:run`)
    process.exit(1)
  }

  const urls = JSON.parse(readFileSync(RECORD_FILE, 'utf-8')) as string[]

  console.log(`\n📋 Found ${urls.length} URLs to download\n`)

  let succeeded = 0
  let failed = 0

  for (const url of urls) {
    const urlObj = new URL(url)
    const localPath = join(
      process.cwd(),
      'data',
      urlObj.hostname,
      urlObj.pathname.slice(1)
    )

    // Skip if already exists
    if (existsSync(localPath)) {
      console.log(`⏭️  Skipping (exists): ${localPath}`)
      succeeded++
      continue
    }

    const success = await downloadFile(url, localPath)
    if (success) {
      succeeded++
    } else {
      failed++
    }

    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  console.log(`\n✅ Download complete!`)
  console.log(`   Succeeded: ${succeeded}`)
  console.log(`   Failed: ${failed}`)
  console.log(`   Total: ${urls.length}`)

  if (succeeded > 0) {
    console.log(`\n💡 Now you can run tests with local data:`)
    console.log(`   USE_LOCAL_DATA=true yarn test:run`)
  }
}

main().catch(console.error)
