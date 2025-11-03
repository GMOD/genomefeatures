/**
 * Global setup for Vitest - starts Express server for local data
 */

import { startTestServer, stopTestServer } from './src/stories/test-server'

const USE_LOCAL_DATA = process.env.USE_LOCAL_DATA === 'true'

export async function setup() {
  if (USE_LOCAL_DATA) {
    console.log('🚀 Starting test server for local data...')
    await startTestServer()
  }
}

export async function teardown() {
  if (USE_LOCAL_DATA) {
    console.log('🛑 Stopping test server...')
    await stopTestServer()
  }
}
