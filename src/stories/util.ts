import {
  GenomeFeatureViewer,
  fetchApolloAPIData,
  fetchNCListData,
  fetchTabixVcfData,
} from '../main'
import { TrackType } from '../tracks/TrackTypeEnum'
import { parseLocString } from '../util'

const BASE_URL = 'https://www.alliancegenome.org/apollo'

export function createElement(id: string) {
  const div = document.createElement('div')
  div.className = 'viewer-border'
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('style', 'border: 1px solid black')
  svg.setAttribute('width', '600')
  svg.setAttribute('height', '250')
  svg.setAttributeNS(
    'http://www.w3.org/2000/xmlns/',
    'xmlns:xlink',
    'http://www.w3.org/1999/xlink',
  )
  svg.id = id
  div.append(svg)
  return div
}

interface Props {
  locString: string
  trackName: string
  genome: string
  divId: string
  type: TrackType
  showVariantLabel?: boolean
  variantFilter?: string[]
  isoformFilter?: string[]
  initialHighlight?: string[]
}

export async function createExampleStatic({
  locString,
  genome,
  divId,
  type,
  showVariantLabel,
  variantFilter,
  isoformFilter,
}: Props) {
  const region = parseLocString(locString)
  const trackData = await fetchNCListData({
    region,
    urlTemplate:
      'https://s3.amazonaws.com/agrjbrowse/docker/7.0.0/FlyBase/fruitfly/tracks/All_Genes/{refseq}/trackData.jsonz',
  })
  //const variantData = await fetchTabixVcfData({
  //  url: 'https://s3.amazonaws.com/agrjbrowse/VCF/7.0.0/fly-latest.vcf.gz',
  //  region,
  //})

  new GenomeFeatureViewer(
    {
      region,
      showVariantLabel,
      variantFilter,
      genome,
      isoformFilter,
      tracks: [
        {
          type,
          trackData,
          //variantData,
        },
      ],
    },
    `#${divId}`,
    900,
    500,
  )
}

export async function createExample({
  locString,
  genome,
  divId,
  type,
  showVariantLabel,
  variantFilter,
  isoformFilter,
}: Props) {
  const region = parseLocString(locString)
  const trackData = await fetchApolloAPIData({
    region,
    genome,
    track: 'All Genes',
    baseUrl: `${BASE_URL}/track/`,
  })
  const variantData = await fetchApolloAPIData({
    region,
    genome,
    track: 'Variants',
    baseUrl: `${BASE_URL}/vcf/`,
  })

  new GenomeFeatureViewer(
    {
      region,
      showVariantLabel,
      variantFilter,
      genome,
      isoformFilter,
      tracks: [
        {
          type,
          trackData,
          variantData,
        },
      ],
    },
    `#${divId}`,
    900,
    500,
  )
}

export async function createCovidExample({
  locString,
  genome,
  divId,
  type,
}: {
  locString: string
  genome: string
  divId: string
  type: TrackType
}) {
  const region = parseLocString(locString)
  const trackData = await fetchApolloAPIData({
    region,
    genome,
    track: 'Mature peptides',
    baseUrl: `${BASE_URL}/track/`,
  })
  new GenomeFeatureViewer(
    {
      genome,
      region,
      tracks: [
        {
          type,
          trackData,
        },
      ],
    },
    `#${divId}`,
    900,
    500,
  )
}

export function createExampleAndSvgElementStatic(args: Props) {
  // add to the page in a setTimeout so it runs after the domNode appears if
  // you know your divid already exists in the dom, you can skip the timeout
  setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    createExampleStatic(args)
  }, 1)

  // on your page, this is a existing svg node with given id
  // e.g. <svg id="mysvg"/>
  return createElement(args.divId)
}

export function createExampleAndSvgElement(args: Props) {
  // add to the page in a setTimeout so it runs after the domNode appears if
  // you know your divid already exists in the dom, you can skip the timeout
  setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    createExample(args)
  }, 1)

  // on your page, this is a existing svg node with given id
  // e.g. <svg id="mysvg"/>
  return createElement(args.divId)
}

export function createCovidExampleAndSvgElement(args: Props) {
  // add to the page in a setTimeout so it runs after the domNode appears if
  // you know your divid already exists in the dom, you can skip the timeout
  setTimeout(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    createCovidExample(args)
  }, 1)

  // on your page, this is a existing svg node with given id
  // e.g. <svg id="mysvg"/>
  return createElement(args.divId)
}
