import * as d3 from 'd3'

import { calculateNewTrackPosition, checkSpace } from '../RenderFunctions'
import {
  getJBrowseLink,
  renderTrackDescription,
} from '../services/TrackService'
import { generateSnvPoints } from '../services/VariantService'

import BaseTrack from './BaseTrack'
import { drawIsoforms, DrawIsoformArgs } from './trackUtils'

import type { SimpleFeatureSerialized } from '../services/types'
import type { Region } from '../types'
import type { Selection } from 'd3'

const MAX_ROWS = 10
const UTR_FEATS = ['UTR', 'five_prime_UTR', 'three_prime_UTR']
const CDS_FEATS = ['CDS']
const EXON_FEATS = ['exon']
const EXON_HEIGHT = 10 // will be white / transparent
const CDS_HEIGHT = 10 // will be colored in
const ISOFORM_HEIGHT = 40 // height for each isoform
const ISOFORM_TITLE_HEIGHT = 0 // height for each isoform
const UTR_HEIGHT = 10 // this is the height of the isoform running all of the way through
const TRANSCRIPT_BACKBONE_HEIGHT = 4 // this is the height of the isoform running all of the way through
const ARROW_HEIGHT = 20
const ARROW_WIDTH = 10
const ARROW_POINTS = `0,0 0,${ARROW_HEIGHT} ${ARROW_WIDTH},${ARROW_WIDTH}`
export default class IsoformTrack extends BaseTrack {
  private trackData: SimpleFeatureSerialized[]
  private transcriptTypes: string[]
  private htpVariant?: string
  private region: Region
  private genome: string

  constructor({
    viewer,
    height,
    width,
    transcriptTypes,
    htpVariant,
    trackData,
    region,
    genome,
  }: {
    viewer: Selection<SVGGElement, unknown, HTMLElement | null, undefined>
    height: number
    width: number
    transcriptTypes: string[]
    htpVariant?: string
    trackData?: SimpleFeatureSerialized[]
    region: Region
    genome: string
  }) {
    super({ viewer, width, height })
    this.trackData = trackData ?? []
    this.transcriptTypes = transcriptTypes
    this.htpVariant = htpVariant
    this.region = region
    this.genome = genome
  }



  DrawTrack() {
    const data = this.trackData
    const viewer = this.viewer
    const width = this.width
    const source = this.genome
    const chr = data[0]?.seqId

    const displayFeats = this.transcriptTypes

    const x = d3
      .scaleLinear()
      .domain([this.region.start, this.region.end])
      .range([0, width])

    const tooltipDiv = d3
      .select('body')
      .append('div')
      .attr('class', 'gfc-tooltip')
      .style('visibility', 'visible')
      .style('opacity', 0)

    const closeToolTip = () => {
      tooltipDiv
        .transition()
        .duration(100)
        .style('opacity', 10)
        .style('visibility', 'hidden')
    }

    if (this.htpVariant) {
      const variantContainer = this.viewer
        .append('g')
        .attr('class', 'variants track')
        .attr('transform', 'translate(0,22.5)')
      const [, fmin] = this.htpVariant.split(':')
      variantContainer
        .append('polygon')
        .attr('class', 'variant-SNV')
        .attr('points', generateSnvPoints(x(+fmin)))
        .attr('fill', 'red')
        .attr('x', x(+fmin))
        .attr('z-index', 30)
    }

    const newTrackPosition = calculateNewTrackPosition(this.viewer)
    const track = viewer
      .append('g')
      .attr('transform', `translate(0,${newTrackPosition})`)
      .attr('class', 'track')

    const returnedHeight = drawIsoforms({
      track,
      isoformData: data,
      x,
      width,
      isoformFilter: [], // IsoformTrack doesn't have an isoformFilter property
      display_feats: displayFeats,
      tooltipDiv,
      renderTooltipDescription: this.renderTooltipDescription,
      closeToolTip,
      viewStart: this.region.start,
      viewEnd: this.region.end,
      source,
      chr,
    })

    return returnedHeight
  }
}
