import * as d3 from 'd3'

import {
  calculateNewTrackPosition,
  checkSpace,
  findRange,
  setHighlights,
} from '../RenderFunctions'
import {
  getJBrowseLink,
  renderTrackDescription,
} from '../services/TrackService'
import {
  filterVariantData,
  generateDelinsPoint,
  generateInsertionPoint,
  generateSnvPoints,
  generateVariantDataBinsAndDataSets,
  getColorsForConsequences,
  getDeletionHeight,
  getVariantAlleles,
  getVariantDescriptions,
  getVariantSymbol,
  getVariantTrackPositions,
  renderVariantDescriptions,
} from '../services/VariantService'

import { drawIsoforms } from './trackUtils'
import BaseTrack from './BaseTrack'

import type { VariantFeature } from '../services/VariantService'
import type { SimpleFeatureSerialized } from '../services/types'
import type { Selection } from 'd3'

export default class IsoformAndVariantTrack extends BaseTrack {
  private trackData: SimpleFeatureSerialized[]
  private variantData: VariantFeature[]
  private variantFilter: string[]
  private isoformFilter: string[]
  private initialHighlight?: string[]
  private transcriptTypes: string[]
  private variantTypes: string[]
  private binRatio: number
  private showVariantLabel: boolean

  constructor({
    viewer,
    height,
    width,
    transcriptTypes,
    variantTypes,
    showVariantLabel,
    variantFilter,
    binRatio,
    isoformFilter,
    initialHighlight,
    trackData,
    variantData,
  }: {
    viewer: Selection<SVGGElement, unknown, HTMLElement | null, undefined>
    height: number
    width: number
    transcriptTypes: string[]
    variantTypes: string[]
    showVariantLabel?: boolean
    variantFilter: string[]
    binRatio: number
    isoformFilter: string[]
    initialHighlight?: string[]
    trackData?: SimpleFeatureSerialized[]
    variantData?: VariantFeature[]
  }) {
    super({ viewer, width, height })
    this.trackData = trackData ?? []
    this.variantData = variantData ?? []
    this.variantFilter = variantFilter
    this.isoformFilter = isoformFilter
    this.initialHighlight = initialHighlight
    this.transcriptTypes = transcriptTypes
    this.variantTypes = variantTypes
    this.binRatio = binRatio
    this.showVariantLabel = showVariantLabel ?? true
  }

  DrawTrack() {
    const isoformFilter = this.isoformFilter
    let isoformData = this.trackData
    const initialHighlight = this.initialHighlight
    const variantData = filterVariantData(
      this.variantData,
      this.variantFilter,
    )
    const viewer = this.viewer
    const width = this.width
    const binRatio = this.binRatio
    const distinctVariants = getVariantTrackPositions(variantData)
    const numVariantTracks = distinctVariants.length
    const source = this.trackData[0].source
    const chr = this.trackData[0].seqId
    const MAX_ROWS = isoformFilter.length === 0 ? 9 : 30

    const UTR_feats = ['UTR', 'five_prime_UTR', 'three_prime_UTR']
    const CDS_feats = ['CDS']
    const exon_feats = ['exon']
    const display_feats = this.transcriptTypes
    const dataRange = findRange(isoformData, display_feats)

    const viewStart = dataRange.fmin
    const viewEnd = dataRange.fmax

    // constants
    const EXON_HEIGHT = 10 // will be white / transparent
    const CDS_HEIGHT = 10 // will be colored in
    const ISOFORM_HEIGHT = 40 // height for each isoform
    const GENE_LABEL_HEIGHT = 20
    const MIN_WIDTH = 2
    const ISOFORM_TITLE_HEIGHT = 0 // height for each isoform
    const UTR_HEIGHT = 10 // this is the height of the isoform running all of the way through
    const VARIANT_HEIGHT = 10 // this is the height of the isoform running all of the way through
    const TRANSCRIPT_BACKBONE_HEIGHT = 4 // this is the height of the isoform running all of the way through
    const ARROW_HEIGHT = 20
    const ARROW_WIDTH = 10
    const ARROW_POINTS = `0,0 0,${ARROW_HEIGHT} ${ARROW_WIDTH},${ARROW_WIDTH}`
    const SNV_WIDTH = 10
    const VARIANT_TRACK_HEIGHT = 40 // Not sure if this needs to be dynamic or not
    const LABEL_PADDING = 22.5

    const x = d3.scaleLinear().domain([viewStart, viewEnd]).range([0, width])

    // Lets put this here so that the "track" part will give us extra space automagically
    const deletionTrack = viewer
      .append('g')
      .attr('class', 'deletions track')
      .attr('transform', 'translate(0,22.5)')
    const labelTrack = viewer.append('g').attr('class', 'label')

    const sortWeight = {} as Record<string, number>
    for (let i = 0, len = UTR_feats.length; i < len; i++) {
      sortWeight[UTR_feats[i]] = 200
    }
    for (let i = 0, len = CDS_feats.length; i < len; i++) {
      sortWeight[CDS_feats[i]] = 1000
    }
    for (let i = 0, len = exon_feats.length; i < len; i++) {
      sortWeight[exon_feats[i]] = 100
    }

    const geneList = {} as Record<string, string>

    isoformData = isoformData.sort((a, b) => {
      if (a.selected && !b.selected) {
        return -1
      }
      if (!a.selected && b.selected) {
        return 1
      }
      return a.name.localeCompare(b.name)
    })

    let heightBuffer = 0

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
    // Separate isoform and variant render
    const variantBins = generateVariantDataBinsAndDataSets(
      variantData,
      (viewEnd - viewStart) * binRatio,
    )

    // We need to do all of the deletions first...
    const deletionBins = variantBins.filter(v => v.type === 'deletion')
    const otherBins = variantBins.filter(v => v.type !== 'deletion')

    const deletionSpace = [] as { fmin: number; fmax: number; row: number }[] // Array of array of objects for deletion layout.
    deletionBins.forEach(variant => {
      const { fmax, fmin } = variant
      const drawnVariant = true
      const isPoints = false
      const viewerWidth = this.width
      const symbol_string = getVariantSymbol(variant)
      const descriptions = getVariantDescriptions(variant)
      const variant_alleles = getVariantAlleles(variant)
      const descriptionHtml = renderVariantDescriptions(descriptions)
      const consequenceColor = getColorsForConsequences(descriptions)[0]

      // Function to determine what row this goes on... not working yet.
      deletionSpace.push({
        fmin: fmin,
        fmax: fmax,
        row: getDeletionHeight(deletionSpace, fmin, fmax),
      })

      const width = Math.max(Math.ceil(x(fmax) - x(fmin)), MIN_WIDTH)
      deletionTrack
        .append('rect')
        .attr('class', 'variant-deletion')
        .attr('id', `variant-${fmin}`)
        .attr('x', x(fmin))
        .attr(
          'transform',
          `translate(0,${VARIANT_HEIGHT * getDeletionHeight(deletionSpace, fmin, fmax)})`,
        )
        .attr('z-index', 30)
        .attr('fill', consequenceColor)
        .attr('height', VARIANT_HEIGHT)
        .attr('width', width)
        .on('click', () => {
          this.renderTooltipDescription(tooltipDiv, descriptionHtml, closeToolTip)
        })
        .on('mouseover', d => {
          const theVariant = d.variant
          d3.selectAll<SVGGElement, { variant: VariantFeature }>(
            '.variant-deletion',
          )
            .filter(d => d.variant === theVariant)
            .style('stroke', 'black')

          d3.select('.label')
            .selectAll<SVGGElement, { variant: VariantFeature }>(
              '.variantLabel,.variantLabelBackground',
            )
            .raise()
            .filter(d => d.variant === theVariant)
            .style('opacity', 1)
        })
        .on('mouseout', () => {
          d3.selectAll<SVGGElement, { selected: string }>('.variant-deletion')
            .filter(d => d.selected !== 'true')
            .style('stroke', null)
          d3.select('.label')
            .selectAll('.variantLabel,.variantLabelBackground')
            .style('opacity', 0)
        })
        .datum({
          fmin: fmin,
          fmax: fmax,
          variant: symbol_string + fmin,
          alleles: variant_alleles,
        })

      // drawnVariant = false;//disable labels for now;
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (drawnVariant) {
        let label_offset = 0
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        label_offset = isPoints ? x(fmin) - SNV_WIDTH / 2 : x(fmin)

        const label_height = VARIANT_HEIGHT * numVariantTracks + LABEL_PADDING
        const variant_label = labelTrack
          .append('text')
          .attr('class', 'variantLabel')
          .attr('fill', consequenceColor)
          .attr('opacity', 0)
          .attr('height', ISOFORM_TITLE_HEIGHT)
          .attr('transform', `translate(${label_offset},${label_height})`)
          // if html, it cuts off the <sup> tag
          .text(symbol_string)
          .on('click', () => {
            this.renderTooltipDescription(tooltipDiv, descriptionHtml, closeToolTip)
          })
          .datum({ fmin: fmin, variant: symbol_string + fmin })

        const symbol_string_width = variant_label.node()?.getBBox().width ?? 0
        if (symbol_string_width + label_offset > viewerWidth) {
          const diff = symbol_string_width + label_offset - viewerWidth
          label_offset -= diff
          variant_label.attr(
            'transform',
            `translate(${label_offset},${label_height})`,
          )
        }
      }
    })

    // Need to adjust for the label track being created already... but is below this track.
    const variantTrackAdjust = calculateNewTrackPosition(this.viewer)
    const variantContainer = viewer
      .append('g')
      .attr('class', 'variants track')
      .attr('transform', `translate(0,${variantTrackAdjust})`)

    otherBins.forEach(variant => {
      const { type, fmax, fmin } = variant
      let drawnVariant = true
      let isPoints = false
      const viewerWidth = this.width
      const symbol_string = getVariantSymbol(variant)
      const descriptions = getVariantDescriptions(variant)
      const variant_alleles = getVariantAlleles(variant)
      const descriptionHtml = renderVariantDescriptions(descriptions)
      const consequenceColor = getColorsForConsequences(descriptions)[0]
      if (
        type.toLowerCase() === 'snv' ||
        type.toLowerCase() === 'point_mutation'
      ) {
        isPoints = true
        variantContainer
          .append('polygon')
          .attr('class', 'variant-SNV')
          .attr('id', `variant-${fmin}`)
          .attr('points', generateSnvPoints(x(fmin)))
          .attr('fill', consequenceColor)
          .attr('x', x(fmin))
          .attr(
            'transform',
            `translate(0,${VARIANT_HEIGHT * distinctVariants.indexOf('snv')})`,
          )
          .attr('z-index', 30)
          .on('click', () => {
            this.renderTooltipDescription(tooltipDiv, descriptionHtml, closeToolTip)
          })
          .on('mouseover', function (d) {
            const theVariant = d.variant
            d3.selectAll<SVGGElement, { variant: VariantFeature }>(
              '.variant-SNV',
            )
              .filter(d => d.variant === theVariant)
              .style('stroke', 'black')
            d3.select('.label')
              .selectAll<SVGGElement, { variant: VariantFeature }>(
                '.variantLabel,.variantLabelBackground',
              )
              .raise()
              .filter(d => d.variant === theVariant)
              .style('opacity', 1)
          })
          .on('mouseout', () => {
            d3.selectAll<SVGGElement, { selected: string }>('.variant-SNV')
              .filter(d => d.selected != 'true')
              .style('stroke', null)
            d3.select('.label')
              .selectAll('.variantLabel,.variantLabelBackground')
              .style('opacity', 0)
          })
          .datum({
            fmin: fmin,
            fmax: fmax,
            variant: symbol_string + fmin,
            alleles: variant_alleles,
          })
      } else if (type.toLowerCase() === 'insertion') {
        isPoints = true
        variantContainer
          .append('polygon')
          .attr('class', 'variant-insertion')
          .attr('id', `variant-${fmin}`)
          .attr('points', generateInsertionPoint(x(fmin)))
          .attr('fill', consequenceColor)
          .attr('x', x(fmin))
          .attr(
            'transform',
            `translate(0,${
              VARIANT_HEIGHT * distinctVariants.indexOf('insertion')
            })`,
          )
          .attr('z-index', 30)
          .on('click', () => {
            this.renderTooltipDescription(tooltipDiv, descriptionHtml, closeToolTip)
          })
          .on('mouseover', d => {
            const theVariant = d.variant
            d3.selectAll<SVGGElement, { variant: VariantFeature }>(
              '.variant-insertion',
            )
              .filter(d => d.variant === theVariant)
              .style('stroke', 'black')
            d3.select('.label')
              .selectAll<SVGGElement, { variant: VariantFeature }>(
                '.variantLabel,.variantLabelBackground',
              )
              .raise()
              .filter(d => d.variant === theVariant)
              .style('opacity', 1)
          })
          .on('mouseout', () => {
            d3.selectAll<SVGGElement, { selected: string }>(
              '.variant-insertion',
            )
              .filter(d => d.selected != 'true')
              .style('stroke', null)
            d3.select('.label')
              .selectAll('.variantLabel,.variantLabelBackground')
              .style('opacity', 0)
          })
          .datum({
            fmin: fmin,
            fmax: fmax,
            variant: symbol_string + fmin,
            alleles: variant_alleles,
          })
      } else if (
        type.toLowerCase() === 'delins' ||
        type.toLowerCase() === 'substitution' ||
        type.toLowerCase() === 'indel' ||
        type.toLowerCase() === 'mnv'
      ) {
        isPoints = true
        variantContainer
          .append('polygon')
          .attr('class', 'variant-delins')
          .attr('id', `variant-${fmin}`)
          .attr('points', generateDelinsPoint(x(fmin)))
          .attr('x', x(fmin))
          .attr(
            'transform',
            `translate(0,${
              VARIANT_HEIGHT * distinctVariants.indexOf('delins')
            })`,
          )
          .attr('fill', consequenceColor)
          .attr('z-index', 30)
          .on('click', () => {
            this.renderTooltipDescription(tooltipDiv, descriptionHtml, closeToolTip)
          })
          .on('mouseover', d => {
            const theVariant = d.variant
            d3.selectAll<SVGGElement, { variant: VariantFeature }>(
              '.variant-delins',
            )
              .filter(d => d.variant === theVariant)
              .style('stroke', 'black')
            d3.select('.label')
              .selectAll<SVGGElement, { variant: VariantFeature }>(
                '.variantLabel,.variantLabelBackground',
              )
              .raise()
              .filter(d => d.variant === theVariant)
              .style('opacity', 1)
          })
          .on('mouseout', () => {
            d3.selectAll<SVGGElement, { selected: string }>('.variant-delins')
              .filter(d => d.selected != 'true')
              .style('stroke', null)
            d3.select('.label')
              .selectAll('.variantLabel,.variantLabelBackground')
              .style('opacity', 0)
          })
          .datum({
            fmin: fmin,
            fmax: fmax,
            variant: symbol_string + fmin,
            alleles: variant_alleles,
          })
      } else {
        console.warn('type not found', type, variant)
        drawnVariant = false
      }

      if (drawnVariant) {
        let label_offset = 0
        label_offset = isPoints ? x(fmin) - SNV_WIDTH / 2 : x(fmin)

        const label_height = VARIANT_HEIGHT * numVariantTracks + LABEL_PADDING
        const variant_label = labelTrack
          .append('text')
          .attr('class', 'variantLabel')
          .attr('fill', consequenceColor)
          .attr('opacity', 0)
          .attr('height', ISOFORM_TITLE_HEIGHT)
          .attr('transform', `translate(${label_offset},${label_height})`)
          // if html, it cuts off the <sup> tag
          .text(symbol_string)
          .on('click', () => {
            this.renderTooltipDescription(tooltipDiv, descriptionHtml, closeToolTip)
          })
          .datum({ fmin: fmin, variant: symbol_string + fmin })

        const symbol_string_width = variant_label.node()?.getBBox().width ?? 0
        if (symbol_string_width + label_offset > viewerWidth) {
          const diff = symbol_string_width + label_offset - viewerWidth
          label_offset -= diff
          variant_label.attr('transform', `translate(${label_offset},35)`)
        }
      }
    })

    // reposition labels after height is determined.
    const labelTrackPosition = variantTrackAdjust
    labelTrack.attr('transform', `translate(0,${labelTrackPosition})`)

    // Calculate where this track should go and translate it, must be after the variant labels are added
    const newTrackPosition =
      calculateNewTrackPosition(this.viewer) + LABEL_PADDING
    const track = viewer
      .append('g')
      .attr('transform', `translate(0,${newTrackPosition})`)
      .attr('class', 'track')

    const returnedHeight = drawIsoforms({
      track,
      isoformData,
      x,
      width,
      isoformFilter,
      display_feats,
      tooltipDiv,
      renderTooltipDescription: this.renderTooltipDescription,
      closeToolTip,
      viewStart,
      viewEnd,
      source,
      chr,
    })

    if (initialHighlight) {
      setHighlights(initialHighlight, viewer)
    }

    // we return the appropriate height function
    return returnedHeight + VARIANT_TRACK_HEIGHT
  }



  renderTooltipDescription(
    tooltipDiv: Selection<HTMLDivElement, unknown, HTMLElement, undefined>,
    descriptionHtml: string,
    closeFunction: () => void,
  ): void {
    tooltipDiv
      .transition()
      .duration(200)
      .style('width', 'auto')
      .style('height', 'auto')
      .style('opacity', 1)
      .style('visibility', 'visible')

    tooltipDiv
      .html(descriptionHtml)
      // @ts-expect-error
      .style('left', `${window.event!.pageX + 10}px`)
      // @ts-expect-error
      .style('top', `${window.event!.pageY + 10}px`)
      .append('button')
      .attr('type', 'button')
      .text('Close')
      .on('click', () => {
        closeFunction()
      })

    tooltipDiv
      .append('button')
      .attr('type', 'button')
      .html('&times;')
      .attr('class', 'tooltipDivX')
      .on('click', () => {
        closeFunction()
      })
  }

  setInitialHighlight(
    selectedAlleles: string[],
    svgTarget: Selection<SVGGElement, unknown, null, undefined>,
  ): void {
    const viewer_height = svgTarget.node()?.getBBox().height ?? 0

    // This code needs to be simplified and put in another function
    const highlights = svgTarget
      .selectAll<SVGGElement, VariantFeature>(
        '.variant-deletion,.variant-SNV,.variant-insertion,.variant-delins',
      )
      .filter(d => {
        let returnVal = false
        if (d.alleles) {
          const ids = d.alleles[0].replace(/"|\[|\]| /g, '').split(',')
          ids.forEach(val => {
            if (selectedAlleles.includes(val)) {
              returnVal = true
            }
          })
          d.alleles.forEach(val => {
            if (selectedAlleles.includes(val)) {
              returnVal = true
            }
          })
        }
        return returnVal
      })
      .datum((d: SimpleFeatureSerialized) => {
        d.selected = 'true'
        return d
      })
      .style('stroke', 'black')

    highlights.each(function () {
      const width_val = +(d3.select(this).attr('width') || 3)
      const x_val = +d3.select(this).attr('x') - width_val / 2
      svgTarget
        .select('.deletions.track')
        .append('rect')
        .attr('class', 'highlight')
        .attr('x', x_val)
        .attr('width', width_val)
        .attr('height', viewer_height)
        .attr('fill', 'yellow')
        .attr('opacity', 0.8)
        .lower()
    })
  }
}
