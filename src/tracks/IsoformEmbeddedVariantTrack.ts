import * as d3 from 'd3'

import {
  calculateNewTrackPosition,
  findRange,
  setHighlights,
} from '../RenderFunctions'
import BaseTrack from './BaseTrack'
import { drawIsoforms } from './trackUtils'
import { filterVariantData } from '../services/VariantService'

import type { VariantFeature } from '../services/VariantService'
import type { SimpleFeatureSerialized } from '../services/types'

export default class IsoformEmbeddedVariantTrack extends BaseTrack {
  private trackData: SimpleFeatureSerialized[]
  private variantData: VariantFeature[]
  private variantFilter: string[]
  private transcriptTypes: string[]
  private showVariantLabel: boolean
  private initialHighlight?: string[]

  constructor({
    viewer,
    height,
    width,
    transcriptTypes,
    showVariantLabel,
    variantFilter,
    initialHighlight,
    trackData,
    variantData,
  }: {
    viewer: d3.Selection<SVGGElement, unknown, HTMLElement | null, undefined>
    height: number
    width: number
    transcriptTypes: string[]
    variantTypes: string[]
    showVariantLabel?: boolean
    variantFilter: string[]
    initialHighlight?: string[]
    variantData?: VariantFeature[]
    trackData?: SimpleFeatureSerialized[]
  }) {
    super({ viewer, width, height })
    this.trackData = trackData ?? []
    this.variantData = variantData ?? []
    this.variantFilter = variantFilter
    this.initialHighlight = initialHighlight
    this.transcriptTypes = transcriptTypes
    this.showVariantLabel = showVariantLabel ?? true
  }

  DrawTrack() {
    const variantDataPre = this.variantData
    const trackData = this.trackData
    const isoformData = trackData

    const variantData = filterVariantData(variantDataPre, this.variantFilter)

    const viewer = this.viewer
    const width = this.width
    const showVariantLabel = this.showVariantLabel

    const display_feats = this.transcriptTypes
    const dataRange = findRange(isoformData, display_feats)

    const view_start = dataRange.fmin
    const view_end = dataRange.fmax

    const x = d3.scaleLinear().domain([view_start, view_end]).range([0, width])

    const newTrackPosition = calculateNewTrackPosition(this.viewer)
    const track = viewer
      .append('g')
      .attr('transform', `translate(0,${newTrackPosition})`)
      .attr('class', 'track')

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

    const returnedHeight = drawIsoforms({
      track,
      isoformData,
      x,
      width,
      isoformFilter: [], // IsoformEmbeddedVariantTrack doesn't have an isoformFilter property
      display_feats,
      tooltipDiv,
      renderTooltipDescription: this.renderTooltipDescription,
      closeToolTip,
      viewStart: view_start,
      viewEnd: view_end,
      source: trackData[0].source, // Assuming source is available from the first trackData item
      chr: trackData[0].seqId, // Assuming chr is available from the first trackData item
      variantData,
      showVariantLabel,
    })

    if (this.initialHighlight) {
      try {
        setHighlights(this.initialHighlight, this.viewer)
      } catch (error) {
        // Error calling setHighlights
      }
    }

    return returnedHeight
  }
}
