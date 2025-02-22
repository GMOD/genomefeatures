import NCList from '@gmod/nclist'
import { inflate } from 'pako'

import NCListFeature from './NCListFeature'

export function isGzip(buf) {
  return buf[0] === 31 && buf[1] === 139 && buf[2] === 8
}
async function readFile(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url}`)
  }
  const r2 = await res.arrayBuffer()
  return isGzip(r2) ? inflate(r2) : r2
}
export class NCListService {
  async fetchDataFromUrl(track) {
    const { urlTemplate, baseUrl } = track.url
    const store = new NCList({
      urlTemplate,
      baseUrl,
      readFile,
      compressed: true,
    })
    let feats = []
    for await (const feature of store.getFeatures({
      refName: track.chromosome,
      start: +track.start,
      end: +track.end,
    })) {
      feats.push(new NCListFeature(feature).toJSON())
    }
    return feats
  }
}
