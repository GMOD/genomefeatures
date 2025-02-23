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

export function createExample({
  locString,
  genome,
  divId,
  type,
  showVariantLabel,
  variantFilter,
  isoformFilter,
  initialHighlight,
  trackName = '/All%20Genes/',
}: Props) {
  const ratio = 0.01
  new GenomeFeatureViewer(
    {
      ...parseLocString(locString),
      locale: 'global',
      showVariantLabel,
      variantFilter,
      initialHighlight,
      isoformFilter,
      binRatio: ratio,
      tracks: [
        // @ts-expect-error
        {
          id: '12',
          genome,
          type,
          isoform_url: [
            `${BASE_URL}/track/`,
            trackName,
            '.json?ignoreCache=true',
          ],
          variant_url: [`${BASE_URL}/vcf/`, '/Variants/', '.json'],
        },
      ],
    },
    `#${divId}`,
    900,
    500,
  )
}

export function createCovidExample({
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
  new GenomeFeatureViewer(
    {
      ...parseLocString(locString),
      locale: 'global',
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

export function createExampleAndSvgElement(args: Props) {
  // add to the page in a setTimeout so it runs after the domNode appears if
  // you know your divid already exists in the dom, you can skip the timeout
  setTimeout(() => {
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
    createCovidExample(args)
  }, 1)

  // on your page, this is a existing svg node with given id
  // e.g. <svg id="mysvg"/>
  return createElement(args.divId)
}
