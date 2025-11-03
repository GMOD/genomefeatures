/**
 * Test server that serves local data files via Express
 * This allows tests to use the same URLs as Storybook
 */

import express from 'express'
import serveStatic from 'serve-static'
import type { Server } from 'http'

let server: Server | null = null
const PORT = 3005

export function startTestServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (server) {
      console.log('Test server already running')
      resolve()
      return
    }

    const app = express()

    // Serve data directory with serve-static (avoids Content-Encoding: gzip issues)
    app.use(serveStatic('data'))

    // Health check endpoint
    app.get('/health', (req, res) => {
      res.json({ status: 'ok' })
    })

    server = app.listen(PORT, () => {
      console.log(`✅ Test server listening on http://localhost:${PORT}`)
      resolve()
    })

    server.on('error', (error) => {
      console.error('Failed to start test server:', error)
      reject(error)
    })
  })
}

export function stopTestServer(): Promise<void> {
  return new Promise((resolve) => {
    if (!server) {
      resolve()
      return
    }

    server.close(() => {
      console.log('✅ Test server stopped')
      server = null
      resolve()
    })
  })
}
