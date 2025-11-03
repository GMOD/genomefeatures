import serveStatic from 'serve-static'

// Use serve-static instead of Vite's default static file serving
// This avoids Content-Encoding: gzip being set on .vcf.gz files
// which causes the browser to decompress them (breaking tabix)
const expressMiddleWare = router => {
  router.use(serveStatic('data'))
}

export default expressMiddleWare
