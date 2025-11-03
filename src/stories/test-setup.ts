/**
 * Test setup for using local data files via Express server
 */

// eslint-disable-next-line no-console
console.log(
  '📂 Using local data files via Express server on http://localhost:3005',
)
// Set global variable for story files to use the test server
// @ts-expect-error
globalThis.LOCAL_DATA_SERVER = 'http://localhost:3005'
