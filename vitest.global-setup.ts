/**
 * Global setup for Vitest - starts Express server for local data
 */

import { startTestServer, stopTestServer } from './src/stories/test-server'

export async function setup() {
  console.log('🚀 Starting test server for local data...')
  await startTestServer()
}

export async function teardown() {
  console.log('🛑 Stopping test server...')
  await stopTestServer()
}
