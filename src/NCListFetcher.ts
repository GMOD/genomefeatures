import NCList from '@gmod/nclist'
import { inflate } from 'pako'

import NCListFeature from './NCListFeature'

export function isGzip(buf: Uint8Array) {
  return buf[0] === 31 && buf[1] === 139 && buf[2] === 8
}

async function readFile(url: string) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url}`)
  }
  const r2 = await res.arrayBuffer()
  return isGzip(new Uint8Array(r2)) ? inflate(r2) : r2
}

export async function fetchNCListData({
  urlTemplate,
  baseUrl,
  chromosome,
  start,
  end,
}: {
  urlTemplate: string
  baseUrl: string
  chromosome: string
  start: string
  end: string
}) {
  const store = new NCList({
    urlTemplate,
    baseUrl,
    readFile,
  })
  const feats = []
  for await (const feature of store.getFeatures({
    refName: chromosome,
    start: +start,
    end: +end,
  })) {
    feats.push(new NCListFeature(feature).toJSON())
  }
  return feats
}
