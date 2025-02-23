import { fetchApolloAPIFeatures } from '../ApolloAPIFetcher'
import GenomeFeatureViewer from '../main'
import { TrackType } from '../tracks/TrackTypeEnum'

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

export function parseLocString(locString: string) {
  const [chromosome, range] = locString.split(':')
  const [start, end] = range.split('..')
  return {
    chromosome,
    start: +start,
    end: +end,
  }
}

export async function createExample({
  locString,
  genome,
  divId,
  type,
  showVariantLabel,
  variantFilter,
  isoformFilter,
  initialHighlight,
}: Props) {
  const { chromosome, start, end } = parseLocString(locString)
  const trackData = await fetchApolloAPIFeatures({
    chromosome,
    start,
    end,
    genome,
    track: 'All Genes',
    baseUrl: `${BASE_URL}/track/`,
  })
  const variantData = await fetchApolloAPIFeatures({
    chromosome,
    start,
    end,
    genome,
    track: 'Variants',
    baseUrl: `${BASE_URL}/vcf/`,
  })

  new GenomeFeatureViewer(
    {
      ...parseLocString(locString),
      locale: 'global',
      showVariantLabel,
      variantFilter,
      initialHighlight,
      isoformFilter,
      binRatio: 0.01,
      tracks: [
        // @ts-expect-error
        {
          id: '12',
          genome,
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
  const { chromosome, start, end } = parseLocString(locString)
  const trackData = await fetchApolloAPIFeatures({
    chromosome,
    start,
    end,
    genome,
    track: 'Mature peptides',
    baseUrl: `${BASE_URL}/track/`,
  })
  new GenomeFeatureViewer(
    {
      chromosome,
      start,
      end,
      locale: 'global',
      trackData,
      tracks: [
        // @ts-expect-error
        {
          id: '12',
          genome,
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
