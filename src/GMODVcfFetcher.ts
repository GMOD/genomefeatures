import { TabixIndexedFile } from '@gmod/tabix'
import VCFParser from '@gmod/vcf'
import { RemoteFile } from 'generic-filehandle2'

import type { Region } from './types'
import type { Variant } from '@gmod/vcf'

export async function fetchTabixVcfData({
  url,
  indexUrl,
  indexType = 'TBI',
  region,
}: {
  url: string
  indexUrl?: string
  indexType?: string
  region: Region
}) {
  const idx = indexUrl ?? url + (indexType === 'TBI' ? '.tbi' : '.csi')
  const store = new TabixIndexedFile({
    tbiFilehandle: indexType === 'TBI' ? new RemoteFile(idx) : undefined,
    csiFilehandle: indexType === 'CSI' ? new RemoteFile(idx) : undefined,
    filehandle: new RemoteFile(url),
  })
  const parser = new VCFParser({
    header: await store.getHeader(),
  })
  const feats = [] as Variant[]
  await store.getLines(region.chromosome, region.start, region.end, {
    lineCallback: line => {
      feats.push(parser.parseLine(line))
    },
  })
  return feats
}
