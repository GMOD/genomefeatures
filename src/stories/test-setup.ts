/**
 * Test setup for using local data files via Express server
 */

const USE_LOCAL_DATA = process.env.USE_LOCAL_DATA === 'true'

if (USE_LOCAL_DATA) {
  console.log(
    '📂 Using local data files via Express server on http://localhost:3005',
  )
  // Set global variable for story files to use the test server
  globalThis.LOCAL_DATA_SERVER = 'http://localhost:3005'
}
