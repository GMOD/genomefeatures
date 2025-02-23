import GenomeFeatureViewer from '../main'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import '../GenomeFeatureViewer.css'

const BASE_URL = 'https://www.alliancegenome.org/apollo'

export const createPage = () => {
  const div = document.createElement('div')
  div.className = 'viewer-border'
  const ret = document.createElement('svg')

  ret.id = 'covidExample1'
  ret.className = 'viewer'

  setTimeout(() => {
    createCoVExample(
      'NC_045512.2:17894..28259',
      'SARS-CoV-2',
      'covidExample1',
      TRACK_TYPE.ISOFORM,
      false,
    )
  }, 100)
  div.append(ret)

  return div
}

type TrackType = keyof typeof TRACK_TYPE

function getTranscriptTypes() {
  return [
    'mRNA',
    'ncRNA',
    'piRNA',
    'lincRNA',
    'miRNA',
    'pre_miRNA',
    'snoRNA',
    'lnc_RNA',
    'tRNA',
    'snRNA',
    'rRNA',
    'ARS',
    'antisense_RNA',
    'C_gene_segment',
    'V_gene_segment',
    'pseudogene_attribute',
    'snoRNA_gene',
    'polypeptide_region',
    'mature_protein_region',
  ]
}

function createCoVExample(
  range: string,
  genome: string,
  divId: string,
  type: TrackType,
  showLabel: boolean,
  variantFilter?: string[],
) {
  const chromosome = range.split(':')[0]
  const [start, end] = range.split(':')[1].split('..')
  console.log({ divId })
  new GenomeFeatureViewer(
    {
      locale: 'global',
      chromosome,
      start: +start,
      end: +end,
      transcriptTypes: getTranscriptTypes(),
      showVariantLabel: showLabel,
      variantFilter: variantFilter ?? [],
      tracks: [
        // @ts-expect-error
        {
          id: '12',
          genome,
          type,
          url: [
            `${BASE_URL}/track/`,
            '/Mature%20peptides/',
            '.json?ignoreCache=true&flatten=false',
          ],
        },
      ],
    },
    `#${divId}`,
    900,
    500,
  )
}
