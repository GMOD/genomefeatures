import * as d3 from 'd3'

import { calculateNewTrackPosition, checkSpace } from '../RenderFunctions'
import {
  FEATURE_TYPES,
  adjustLabelPosition,
  createSortWeightMap,
  generateArrowPoints,
  getLabelWidth,
  sortIsoformData,
} from './TrackConstants'
import {
  createCloseTooltipFunction,
  createTooltipDiv,
  renderTooltipDescription,
} from '../services/TooltipService'
import {
  getJBrowseLink,
  renderTrackDescription,
} from '../services/TrackService'
import { generateSnvPoints } from '../services/VariantService'

import type { SimpleFeatureSerialized } from '../services/types'
import type { Region } from '../types'
import type { Selection } from 'd3'

export default class IsoformTrack {
  // Layout constants
  private static readonly MAX_ROWS = 10
  private static readonly EXON_HEIGHT = 10
  private static readonly CDS_HEIGHT = 10
  private static readonly ISOFORM_HEIGHT = 40
  private static readonly ISOFORM_TITLE_HEIGHT = 0
  private static readonly UTR_HEIGHT = 10
  private static readonly TRANSCRIPT_BACKBONE_HEIGHT = 4
  private static readonly ARROW_HEIGHT = 20
  private static readonly ARROW_WIDTH = 10

  private trackData: SimpleFeatureSerialized[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private viewer: Selection<SVGGElement, unknown, HTMLElement | null, any>
  private width: number
  private height: number
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    viewer: Selection<SVGGElement, unknown, HTMLElement | null, any>
    height: number
    width: number
    transcriptTypes: string[]
    htpVariant?: string
    trackData?: SimpleFeatureSerialized[]
    region: Region
    genome: string
  }) {
    this.trackData = trackData ?? []
    this.viewer = viewer
    this.width = width
    this.height = height
    this.transcriptTypes = transcriptTypes
    this.htpVariant = htpVariant
    this.region = region
    this.genome = genome
  }

  DrawTrack() {
    let data = this.trackData
    const htpVariant = this.htpVariant
    const viewer = this.viewer
    const width = this.width
    const source = this.genome
    const chr = data[0]?.seqId

    const MAX_ROWS = IsoformTrack.MAX_ROWS

    const UTR_feats = FEATURE_TYPES.UTR
    const CDS_feats = FEATURE_TYPES.CDS
    const exon_feats = FEATURE_TYPES.EXON
    const displayFeats = this.transcriptTypes

    const exonHeight = IsoformTrack.EXON_HEIGHT
    const cdsHeight = IsoformTrack.CDS_HEIGHT
    const isoformHeight = IsoformTrack.ISOFORM_HEIGHT
    const isoformTitleHeight = IsoformTrack.ISOFORM_TITLE_HEIGHT
    const utrHeight = IsoformTrack.UTR_HEIGHT
    const transcriptBackboneHeight = IsoformTrack.TRANSCRIPT_BACKBONE_HEIGHT
    const arrowHeight = IsoformTrack.ARROW_HEIGHT
    const arrowWidth = IsoformTrack.ARROW_WIDTH
    const arrowPoints = generateArrowPoints(arrowHeight, arrowWidth)

    const x = d3
      .scaleLinear()
      .domain([this.region.start, this.region.end])
      .range([0, width])

    const sortWeight = createSortWeightMap(UTR_feats, CDS_feats, exon_feats)

    data = sortIsoformData(data)

    const tooltipDiv = createTooltipDiv()
    const closeToolTip = createCloseTooltipFunction(tooltipDiv)

    if (htpVariant) {
      const variantContainer = viewer
        .append('g')
        .attr('class', 'variants track')
        .attr('transform', 'translate(0,22.5)')
      const [, fmin] = htpVariant.split(':')
      variantContainer
        .append('polygon')
        .attr('class', 'variant-SNV')
        .attr('points', generateSnvPoints(x(+fmin)))
        .attr('fill', 'red')
        .attr('x', x(+fmin))
        .attr('z-index', 30)
    }

    // Calculate where this track should go and translate it
    const newTrackPosition = calculateNewTrackPosition(this.viewer)
    const track = viewer
      .append('g')
      .attr('transform', `translate(0,${newTrackPosition})`)
      .attr('class', 'track')

    let row_count = 0
    const used_space = [] as string[][]
    let fmin_display = -1
    let fmax_display = -1
    const alreadyRendered = [] as string[] // hack fix for multiple transcript returns.

    for (let i = 0; i < data.length && row_count < MAX_ROWS; i++) {
      const feature = data[i]
      let featureChildren = feature.children
      if (featureChildren) {
        const selected = feature.selected

        // May want to remove this and add an external sort function
        // outside of the render method to put certain features on top.
        featureChildren = featureChildren.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        })

        featureChildren.forEach(featureChild => {
          const featureType = featureChild.type

          if (alreadyRendered.includes(featureChild.id)) {
            return
          } else {
            alreadyRendered.push(featureChild.id)
          }

          if (displayFeats.includes(featureType)) {
            let current_row = checkSpace(
              used_space,
              x(featureChild.fmin),
              x(featureChild.fmax),
            )
            if (row_count < MAX_ROWS) {
              // An isoform container
              const isoform = track
                .append('g')
                .attr('class', 'isoform')
                .attr(
                  'transform',
                  `translate(0,${row_count * isoformHeight + 10})`,
                )

              const transcriptStart = Math.max(x(featureChild.fmin), 0)
              const transcriptEnd = Math.min(x(featureChild.fmax), this.width)
              isoform
                .append('polygon')
                .datum(() => ({
                  strand: feature.strand,
                }))
                .attr('class', 'transArrow')
                .attr('points', arrowPoints)
                .attr('transform', () =>
                  feature.strand > 0
                    ? `translate(${transcriptEnd},0)`
                    : `translate(${transcriptStart},${arrow_height}) rotate(180)`,
                )
                .on('click', (event) => {
                  renderTooltipDescription(
                    tooltipDiv,
                    renderTrackDescription(featureChild),
                    closeToolTip,
                    event,
                  )
                })

              isoform
                .append('rect')
                .attr('class', 'transcriptBackbone')
                .attr('y', 10 + isoformTitleHeight)
                .attr('height', transcriptBackboneHeight)
                .attr('transform', `translate(${transcriptStart},0)`)
                .attr('width', transcriptEnd - transcriptStart)
                .datum({
                  fmin: featureChild.fmin,
                  fmax: featureChild.fmax,
                })
                .on('click', (event) => {
                  renderTooltipDescription(
                    tooltipDiv,
                    renderTrackDescription(featureChild),
                    closeToolTip,
                    event,
                  )
                })
              let text_string = featureChild.name
              if (feature.name !== featureChild.name) {
                text_string += ` (${feature.name})`
              }
              let labelOffset = Math.max(x(featureChild.fmin), 0)
              const textLabel = isoform
                .append('svg:text')
                .attr('class', 'transcriptLabel')
                .attr('fill', selected ? 'sandybrown' : 'gray')
                .attr('opacity', selected ? 1 : 0.5)
                .attr('height', isoformTitleHeight)
                .attr('transform', `translate(${labelOffset},0)`)
                .text(text_string)
                .datum({
                  fmin: featureChild.fmin,
                })
                .on('click', (event) => {
                  renderTooltipDescription(
                    tooltipDiv,
                    renderTrackDescription(featureChild),
                    closeToolTip,
                    event,
                  )
                })

              // @ts-expect-error - textLabel has getBBox method
              const symbolStringWidth = getLabelWidth(textLabel)
              labelOffset = adjustLabelPosition(labelOffset, symbolStringWidth, this.width)
              textLabel.attr('transform', `translate(${labelOffset},0)`)

              // Now that the label has been created we can calculate the space that
              // this new element is taking up making sure to add in the width of
              // the box.
              // @ts-expect-error - textLabel has getBBox method
              const textWidth = getLabelWidth(textLabel, text_string.length * 2)
              const featEnd =
                textWidth > x(featureChild.fmax) - x(featureChild.fmin)
                  ? x(featureChild.fmin) + textWidth
                  : x(featureChild.fmax)

              // This is probably not the most efficient way to do this.
              // Making an 2d array... each row is the first array (no zer0)
              // next level is each element taking up space.
              // Also using colons as spacers seems very perl... maybe change that?
              // *** DANGER EDGE CASE ***/
              if (used_space[current_row]) {
                const temp = used_space[current_row]
                temp.push(`${x(featureChild.fmin)}:${featEnd}`)
                used_space[current_row] = temp
              } else {
                used_space[current_row] = [`${x(featureChild.fmin)}:${featEnd}`]
              }

              // Now check on bounds since this feature is displayed
              // The true end of display is converted to bp.
              if (fmin_display < 0 || fmin_display > featureChild.fmin) {
                fmin_display = featureChild.fmin
              }
              if (fmax_display < 0 || fmax_display < featureChild.fmax) {
                fmax_display = featureChild.fmax
              }
              if (featureChild.children) {
                // have to sort this so we draw the exons BEFORE the CDS
                featureChild.children = featureChild.children.sort(
                  function (a, b) {
                    const sortAValue = sortWeight[a.type]
                    const sortBValue = sortWeight[b.type]

                    if (
                      typeof sortAValue === 'number' &&
                      typeof sortBValue === 'number'
                    ) {
                      return sortAValue - sortBValue
                    }
                    if (
                      typeof sortAValue === 'number' &&
                      typeof sortBValue !== 'number'
                    ) {
                      return -1
                    }
                    if (
                      typeof sortAValue !== 'number' &&
                      typeof sortBValue === 'number'
                    ) {
                      return 1
                    }
                    // NOTE: type not found and weighted
                    return a.type.localeCompare(b.type)
                  },
                )

                featureChild.children.forEach(innerChild => {
                  const innerType = innerChild.type
                  // Skip feats out of bounds.
                  if (
                    x(innerChild.fmin) > this.width ||
                    x(innerChild.fmax) < 0
                  ) {
                    return // skip feat
                  }
                  const innerStart = Math.max(x(innerChild.fmin), 0)
                  const innerEnd = Math.min(x(innerChild.fmax), this.width)
                  if (exon_feats.includes(innerType)) {
                    isoform
                      .append('rect')
                      .attr('class', 'exon')
                      .attr('x', innerStart)
                      .attr(
                        'transform',
                        `translate(0,${
                          exonHeight - transcriptBackboneHeight
                        })`,
                      )
                      .attr('height', exonHeight)
                      .attr('z-index', 10)
                      .attr('width', innerEnd - innerStart)
                      .datum({
                        fmin: innerChild.fmin,
                        fmax: innerChild.fmax,
                      })
                      .on('click', (event) => {
                        renderTooltipDescription(
                          tooltipDiv,
                          renderTrackDescription(featureChild),
                          closeToolTip,
                          event,
                        )
                      })
                  } else if (CDS_feats.includes(innerType)) {
                    isoform
                      .append('rect')
                      .attr('class', 'CDS')
                      .attr('x', innerStart)
                      .attr(
                        'transform',
                        `translate(0,${
                          cdsHeight - transcriptBackboneHeight
                        })`,
                      )
                      .attr('z-index', 20)
                      .attr('height', cdsHeight)
                      .attr('width', innerEnd - innerStart)
                      .datum({
                        fmin: innerChild.fmin,
                        fmax: innerChild.fmax,
                      })
                      .on('click', (event) => {
                        renderTooltipDescription(
                          tooltipDiv,
                          renderTrackDescription(featureChild),
                          closeToolTip,
                          event,
                        )
                      })
                  } else if (UTR_feats.includes(innerType)) {
                    isoform
                      .append('rect')
                      .attr('class', 'UTR')
                      .attr('x', innerStart)
                      .attr(
                        'transform',
                        `translate(0,${
                          utrHeight - transcriptBackboneHeight
                        })`,
                      )
                      .attr('z-index', 20)
                      .attr('height', utrHeight)
                      .attr('width', innerEnd - innerStart)
                      .datum({
                        fmin: innerChild.fmin,
                        fmax: innerChild.fmax,
                      })
                      .on('click', (event) => {
                        renderTooltipDescription(
                          tooltipDiv,
                          renderTrackDescription(featureChild),
                          closeToolTip,
                          event,
                        )
                      })
                  }
                })
              }
              row_count += 1
            }
            if (row_count === MAX_ROWS) {
              const link = getJBrowseLink(
                source,
                chr,
                this.region.start,
                this.region.end,
              )
              ++current_row
              track
                .append('a')
                .attr('class', 'transcriptLabel')
                .attr('xlink:show', 'new')
                .append('text')
                .attr('x', 10)
                .attr(
                  'transform',
                  `translate(0,${row_count * isoformHeight + 10})`,
                )
                .attr('fill', 'red')
                .attr('opacity', 1)
                .attr('height', isoformTitleHeight)
                .html(link)
            }
          }
        })
      }
    }

    if (row_count === 0) {
      track
        .append('text')
        .attr('x', 30)
        .attr('y', isoformTitleHeight + 10)
        .attr('fill', 'orange')
        .attr('opacity', 0.6)
        .text(
          'Overview of non-coding genome features unavailable at this time.',
        )
    }
    // we return the appropriate height function
    return row_count * isoformHeight
  }
}
