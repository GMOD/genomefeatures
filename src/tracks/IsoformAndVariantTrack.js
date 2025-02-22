import * as d3 from 'd3'

import {
  calculateNewTrackPosition,
  checkSpace,
  findRange,
  setHighlights,
} from '../RenderFunctions'
import { ApolloService } from '../services/ApolloService'
import {
  getJBrowseLink,
  renderTrackDescription,
} from '../services/TrackService'
import {
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
let apolloService = new ApolloService()

// TODO: make configurable and a const / default
// let MAX_ROWS = 9;

export default class IsoformAndVariantTrack {
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
    initialHiglight,
    service,
  }) {
    this.trackData = {}
    this.variantData = {}
    this.viewer = viewer
    this.width = width
    this.variantFilter = variantFilter
    this.isoformFilter = isoformFilter
    this.initialHighlight = initialHiglight
    this.height = height
    this.transcriptTypes = transcriptTypes
    this.variantTypes = variantTypes
    this.binRatio = binRatio
    this.showVariantLabel =
      showVariantLabel !== undefined ? showVariantLabel : true
    this.service = service || apolloService
  }

  // Draw our track on the viewer
  // TODO: Potentially seperate this large section of code
  // for both testing/extensibility
  DrawTrack() {
    let isoformFilter = this.isoformFilter
    let isoformData = this.trackData
    let initialHighlight = this.initialHighlight
    let variantData = this.filterVariantData(
      this.variantData,
      this.variantFilter,
    )
    let viewer = this.viewer
    let width = this.width
    let binRatio = this.binRatio
    let distinctVariants = getVariantTrackPositions(variantData)
    let numVariantTracks = distinctVariants.length
    let source = this.trackData[0].source
    let chr = this.trackData[0].seqId
    let MAX_ROWS = isoformFilter.length === 0 ? 9 : 30

    let UTR_feats = ['UTR', 'five_prime_UTR', 'three_prime_UTR']
    let CDS_feats = ['CDS']
    let exon_feats = ['exon']
    let display_feats = this.transcriptTypes
    let dataRange = findRange(isoformData, display_feats)

    let viewStart = dataRange.fmin
    let viewEnd = dataRange.fmax

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

    let x = d3.scaleLinear().domain([viewStart, viewEnd]).range([0, width])

    // Lets put this here so that the "track" part will give us extra space automagically
    let deletionTrack = viewer
      .append('g')
      .attr('class', 'deletions track')
      .attr('transform', 'translate(0,22.5)')
    // We need a new container for labels now.
    let labelTrack = viewer.append('g').attr('class', 'label')

    // Append Invisible Rect to give space properly if only one track exists.
    // variantContainer.append('rect').style("opacity", 0).attr("height", VARIANT_HEIGHT*numVariantTracks).attr("width",width);

    // need to build a new sortWeight since these can be dynamic
    let sortWeight = {}
    for (let i = 0, len = UTR_feats.length; i < len; i++) {
      sortWeight[UTR_feats[i]] = 200
    }
    for (let i = 0, len = CDS_feats.length; i < len; i++) {
      sortWeight[CDS_feats[i]] = 1000
    }
    for (let i = 0, len = exon_feats.length; i < len; i++) {
      sortWeight[exon_feats[i]] = 100
    }

    let geneList = {}

    isoformData = isoformData.sort((a, b) => {
      if (a.selected && !b.selected) {
        return -1
      }
      if (!a.selected && b.selected) {
        return 1
      }
      return a.name - b.name
    })

    let heightBuffer = 0

    let tooltipDiv = d3
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
    // **************************************
    // Seperate isoform and variant render
    // **************************************
    let variantBins = generateVariantDataBinsAndDataSets(
      variantData,
      (viewEnd - viewStart) * binRatio,
    )

    // We need to do all of the deletions first...
    let deletionBins = variantBins.filter(v => v.type == 'deletion')
    let otherBins = variantBins.filter(v => v.type !== 'deletion')

    let deletionSpace = [] // Array of array of objects for deletion layout.
    deletionBins.forEach(variant => {
      let { fmax, fmin } = variant
      let drawnVariant = true
      let isPoints = false
      let viewerWidth = this.width
      let symbol_string = getVariantSymbol(variant)
      const descriptions = getVariantDescriptions(variant)
      let variant_alleles = getVariantAlleles(variant)
      let descriptionHtml = renderVariantDescriptions(descriptions)
      const consequenceColor = getColorsForConsequences(descriptions)[0]

      // Function to determine what row this goes on... not working yet.
      let currentHeight = getDeletionHeight(deletionSpace, fmin, fmax)
      // Add start/end to array
      deletionSpace.push({ fmin: fmin, fmax: fmax, row: currentHeight })

      const width = Math.max(Math.ceil(x(fmax) - x(fmin)), MIN_WIDTH)
      deletionTrack
        .append('rect')
        .attr('class', 'variant-deletion')
        .attr('id', `variant-${fmin}`)
        .attr('x', x(fmin))
        .attr('transform', `translate(0,${VARIANT_HEIGHT * currentHeight})`)
        .attr('z-index', 30)
        .attr('fill', consequenceColor)
        .attr('height', VARIANT_HEIGHT)
        .attr('width', width)
        .on('click', () => {
          renderTooltipDescription(tooltipDiv, descriptionHtml, closeToolTip)
        })
        .on('mouseover', d => {
          let theVariant = d.variant
          d3.selectAll('.variant-deletion')
            .filter(d => d.variant === theVariant)
            .style('stroke', 'black')
          d3.select('.label')
            .selectAll('.variantLabel,.variantLabelBackground')
            .raise()
            .filter(d => d.variant === theVariant)
            .style('opacity', 1)
        })
        .on('mouseout', () => {
          d3.selectAll('.variant-deletion')
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
      // TESTY
      // drawnVariant = false;//disable lables for now;
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (drawnVariant) {
        let label_offset = 0
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        label_offset = isPoints ? x(fmin) - SNV_WIDTH / 2 : x(fmin)

        let label_height = VARIANT_HEIGHT * numVariantTracks + LABEL_PADDING
        let variant_label = labelTrack
          .append('text')
          .attr('class', 'variantLabel')
          .attr('fill', consequenceColor)
          .attr('opacity', 0)
          .attr('height', ISOFORM_TITLE_HEIGHT)
          .attr('transform', `translate(${label_offset},${label_height})`)
          // if html, it cuts off the <sup> tag
          .text(symbol_string)
          .on('click', () => {
            renderTooltipDescription(tooltipDiv, descriptionHtml, closeToolTip)
          })
          .datum({ fmin: fmin, variant: symbol_string + fmin })

        let symbol_string_width = variant_label.node().getBBox().width
        if (parseFloat(symbol_string_width + label_offset) > viewerWidth) {
          let diff = parseFloat(
            symbol_string_width + label_offset - viewerWidth,
          )
          label_offset -= diff
          variant_label.attr(
            'transform',
            `translate(${label_offset},${label_height})`,
          )
        }
      }
    })

    // Need to adjust for the label track being created already... but is below this track.
    let variantTrackAdjust = calculateNewTrackPosition(this.viewer)
    let variantContainer = viewer
      .append('g')
      .attr('class', 'variants track')
      .attr('transform', `translate(0,${variantTrackAdjust})`)

    otherBins.forEach(variant => {
      let { type, fmax, fmin } = variant
      let drawnVariant = true
      let isPoints = false
      let viewerWidth = this.width
      let symbol_string = getVariantSymbol(variant)
      const descriptions = getVariantDescriptions(variant)
      let variant_alleles = getVariantAlleles(variant)
      let descriptionHtml = renderVariantDescriptions(descriptions)
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
            renderTooltipDescription(tooltipDiv, descriptionHtml, closeToolTip)
          })
          .on('mouseover', function (d) {
            let theVariant = d.variant
            d3.selectAll('.variant-SNV')
              .filter(function (d) {
                return d.variant === theVariant
              })
              .style('stroke', 'black')
            d3.select('.label')
              .selectAll('.variantLabel,.variantLabelBackground')
              .raise()
              .filter(d => d.variant === theVariant)
              .style('opacity', 1)
          })
          .on('mouseout', () => {
            d3.selectAll('.variant-SNV')
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
            renderTooltipDescription(tooltipDiv, descriptionHtml, closeToolTip)
          })
          .on('mouseover', d => {
            let theVariant = d.variant
            d3.selectAll('.variant-insertion')
              .filter(d => d.variant === theVariant)
              .style('stroke', 'black')
            d3.select('.label')
              .selectAll('.variantLabel,.variantLabelBackground')
              .raise()
              .filter(d => d.variant === theVariant)
              .style('opacity', 1)
          })
          .on('mouseout', () => {
            d3.selectAll('.variant-insertion')
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
            renderTooltipDescription(tooltipDiv, descriptionHtml, closeToolTip)
          })
          .on('mouseover', d => {
            let theVariant = d.variant
            d3.selectAll('.variant-delins')
              .filter(d => d.variant === theVariant)
              .style('stroke', 'black')
            d3.select('.label')
              .selectAll('.variantLabel,.variantLabelBackground')
              .raise()
              .filter(d => d.variant === theVariant)
              .style('opacity', 1)
          })
          .on('mouseout', () => {
            d3.selectAll('.variant-delins')
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

        let label_height = VARIANT_HEIGHT * numVariantTracks + LABEL_PADDING
        let variant_label = labelTrack
          .append('text')
          .attr('class', 'variantLabel')
          .attr('fill', consequenceColor)
          .attr('opacity', 0)
          .attr('height', ISOFORM_TITLE_HEIGHT)
          .attr('transform', `translate(${label_offset},${label_height})`)
          // if html, it cuts off the <sup> tag
          .text(symbol_string)
          .on('click', () => {
            renderTooltipDescription(tooltipDiv, descriptionHtml, closeToolTip)
          })
          .datum({ fmin: fmin, variant: symbol_string + fmin })

        let symbol_string_width = variant_label.node().getBBox().width
        if (parseFloat(symbol_string_width + label_offset) > viewerWidth) {
          let diff = parseFloat(
            symbol_string_width + label_offset - viewerWidth,
          )
          label_offset -= diff
          variant_label.attr('transform', `translate(${label_offset},35)`)
        }
      }
    })

    // reposition labels after height is determined.
    let labelTrackPosition = variantTrackAdjust
    labelTrack.attr('transform', `translate(0,${labelTrackPosition})`)

    // Calculate where this track should go and translate it, must be after the variant lables are added
    let newTrackPosition =
      calculateNewTrackPosition(this.viewer) + LABEL_PADDING
    let track = viewer
      .append('g')
      .attr('transform', `translate(0,${newTrackPosition})`)
      .attr('class', 'track')

    let row_count = 0
    let used_space = []
    let fmin_display = -1
    let fmax_display = -1

    // eslint-disable-next-line @typescript-eslint/unbound-method
    let renderTooltipDescription = this.renderTooltipDescription

    let alreadyRendered = [] // hack fix for multiple transcript returns.
    // **************************************
    // FOR NOW LETS FOCUS ON ONE GENE ISOFORM
    // **************************************
    // let feature = data[0];
    for (let i = 0; i < isoformData.length && row_count < MAX_ROWS; i++) {
      let feature = isoformData[i]
      let featureChildren = feature.children
      if (featureChildren) {
        let selected = feature.selected

        // May want to remove this and add an external sort function
        // outside of the render method to put certain features on top.
        featureChildren = featureChildren.sort(function (a, b) {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return a - b
        })

        // For each isoform..
        let warningRendered = false
        featureChildren.forEach(function (featureChild) {
          if (
            !(
              isoformFilter.includes(featureChild.id) ||
              isoformFilter.includes(featureChild.name)
            ) &&
            isoformFilter.length !== 0
          ) {
            return
          }

          if (alreadyRendered.includes(featureChild.id)) {
            return
          } else {
            alreadyRendered.push(featureChild.id)
          }
          //
          let featureType = featureChild.type

          if (display_feats.includes(featureType)) {
            // function to assign row based on available space.
            // *** DANGER EDGE CASE ***/
            let current_row = checkSpace(
              used_space,
              x(featureChild.fmin),
              x(featureChild.fmax),
            )
            if (row_count < MAX_ROWS) {
              // An isoform container

              let text_string
              let text_label
              let addingGeneLabel = false
              if (!Object.keys(geneList).includes(feature.name)) {
                heightBuffer += GENE_LABEL_HEIGHT
                addingGeneLabel = true
                geneList[feature.name] = 'Green'
              }

              let isoform = track
                .append('g')
                .attr('class', 'isoform')
                .attr(
                  'transform',
                  `translate(0,${
                    row_count * ISOFORM_HEIGHT + 10 + heightBuffer
                  })`,
                )
              if (addingGeneLabel) {
                text_string = feature.name
                text_label = isoform
                  .append('text')
                  .attr('class', 'geneLabel')
                  .attr('fill', selected ? 'sandybrown' : 'black')
                  .attr('height', ISOFORM_TITLE_HEIGHT)
                  .attr(
                    'transform',
                    `translate(${x(featureChild.fmin)},-${GENE_LABEL_HEIGHT})`,
                  )
                  .text(text_string)
                  .on('click', () => {
                    renderTooltipDescription(
                      tooltipDiv,
                      renderTrackDescription(feature),
                      closeToolTip,
                    )
                  })
                  .datum({ fmin: featureChild.fmin })
              }

              isoform
                .append('polygon')
                .datum(() => ({
                  fmin: featureChild.fmin,
                  fmax: featureChild.fmax,
                  strand: feature.strand,
                }))
                .attr('class', 'transArrow')
                .attr('points', ARROW_POINTS)
                .attr('transform', d => {
                  return feature.strand > 0
                    ? `translate(${Number(x(d.fmax))},0)`
                    : `translate(${Number(x(d.fmin))},${ARROW_HEIGHT}) rotate(180)`
                })
                .on('click', () => {
                  renderTooltipDescription(
                    tooltipDiv,
                    renderTrackDescription(featureChild),
                    closeToolTip,
                  )
                })

              isoform
                .append('rect')
                .attr('class', 'transcriptBackbone')
                .attr('y', 10 + ISOFORM_TITLE_HEIGHT)
                .attr('height', TRANSCRIPT_BACKBONE_HEIGHT)
                .attr('transform', `translate(${x(featureChild.fmin)},0)`)
                .attr('width', x(featureChild.fmax) - x(featureChild.fmin))
                .on('click', () => {
                  renderTooltipDescription(
                    tooltipDiv,
                    renderTrackDescription(featureChild),
                    closeToolTip,
                  )
                })
                .datum({ fmin: featureChild.fmin, fmax: featureChild.fmax })

              text_string = featureChild.name
              text_label = isoform
                .append('text')
                .attr('class', 'transcriptLabel')
                .attr('fill', selected ? 'sandybrown' : 'gray')
                .attr('opacity', selected ? 1 : 0.5)
                .attr('height', ISOFORM_TITLE_HEIGHT)
                .attr('transform', `translate(${x(featureChild.fmin)},0)`)
                .text(text_string)
                .on('click', () => {
                  renderTooltipDescription(
                    tooltipDiv,
                    renderTrackDescription(featureChild),
                    closeToolTip,
                  )
                })
                .datum({ fmin: featureChild.fmin })

              // Now that the label has been created we can calculate the space that
              // this new element is taking up making sure to add in the width of
              // the box.
              // TODO: this is just an estimate of the length
              let text_width = text_string.length * 2
              let feat_end

              // not some instances (as in reactjs?) the bounding box isn't available, so we have to guess
              try {
                text_width = text_label.node().getBBox().width
              } catch (e) {
                // console.error('Not yet rendered',e)
              }
              // First check to see if label goes past the end
              if (Number(text_width + x(featureChild.fmin)) > width) {
                // console.error(featureChild.name + " goes over the edge");
              }
              feat_end =
                text_width > x(featureChild.fmax) - x(featureChild.fmin)
                  ? x(featureChild.fmin) + text_width
                  : x(featureChild.fmax)

              // This is probably not the most efficent way to do this.
              // Making an 2d array... each row is the first array (no zer0)
              // next level is each element taking up space.
              // Also using colons as spacers seems very perl... maybe change that?
              // *** DANGER EDGE CASE ***/
              if (used_space[current_row]) {
                let temp = used_space[current_row]
                temp.push(`${x(featureChild.fmin)}:${feat_end}`)
                used_space[current_row] = temp
              } else {
                used_space[current_row] = [
                  `${x(featureChild.fmin)}:${feat_end}`,
                ]
              }

              // Now check on bounds since this feature is displayed
              // The true end of display is converted to bp.
              if (fmin_display < 0 || fmin_display > featureChild.fmin) {
                fmin_display = featureChild.fmin
              }
              if (fmax_display < 0 || fmax_display < featureChild.fmax) {
                fmax_display = featureChild.fmax
              }

              // have to sort this so we draw the exons BEFORE the CDS
              if (featureChild.children) {
                featureChild.children = featureChild.children.sort((a, b) => {
                  let sortAValue = sortWeight[a.type]
                  let sortBValue = sortWeight[b.type]

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
                  return a.type - b.type
                })

                featureChild.children.forEach(innerChild => {
                  let innerType = innerChild.type

                  if (exon_feats.includes(innerType)) {
                    isoform
                      .append('rect')
                      .attr('class', 'exon')
                      .attr('x', x(innerChild.fmin))
                      .attr(
                        'transform',
                        `translate(0,${EXON_HEIGHT - TRANSCRIPT_BACKBONE_HEIGHT})`,
                      )
                      .attr('height', EXON_HEIGHT)
                      .attr('z-index', 10)
                      .attr('width', x(innerChild.fmax) - x(innerChild.fmin))
                      .on('click', () => {
                        renderTooltipDescription(
                          tooltipDiv,
                          renderTrackDescription(featureChild),
                          closeToolTip,
                        )
                      })
                      .datum({ fmin: innerChild.fmin, fmax: innerChild.fmax })
                  } else if (CDS_feats.includes(innerType)) {
                    isoform
                      .append('rect')
                      .attr('class', 'CDS')
                      .attr('x', x(innerChild.fmin))
                      .attr(
                        'transform',
                        `translate(0,${CDS_HEIGHT - TRANSCRIPT_BACKBONE_HEIGHT})`,
                      )
                      .attr('z-index', 20)
                      .attr('height', CDS_HEIGHT)
                      .attr('width', x(innerChild.fmax) - x(innerChild.fmin))
                      .on('click', () => {
                        renderTooltipDescription(
                          tooltipDiv,
                          renderTrackDescription(featureChild),
                          closeToolTip,
                        )
                      })
                      .datum({ fmin: innerChild.fmin, fmax: innerChild.fmax })
                  } else if (UTR_feats.includes(innerType)) {
                    isoform
                      .append('rect')
                      .attr('class', 'UTR')
                      .attr('x', x(innerChild.fmin))
                      .attr(
                        'transform',
                        `translate(0,${UTR_HEIGHT - TRANSCRIPT_BACKBONE_HEIGHT})`,
                      )
                      .attr('z-index', 20)
                      .attr('height', UTR_HEIGHT)
                      .attr('width', x(innerChild.fmax) - x(innerChild.fmin))
                      .on('click', () => {
                        renderTooltipDescription(
                          tooltipDiv,
                          renderTrackDescription(featureChild),
                          closeToolTip,
                        )
                      })
                      .datum({ fmin: innerChild.fmin, fmax: innerChild.fmax })
                  }
                })
              }
              row_count += 1
            }
            if (row_count === MAX_ROWS && !warningRendered) {
              // *** DANGER EDGE CASE ***/
              let link = getJBrowseLink(source, chr, viewStart, viewEnd)
              ++current_row
              warningRendered = true
              track
                .append('a')
                .attr('class', 'transcriptLabel')
                .attr('xlink:show', 'new')
                .append('text')
                .attr('x', 10)
                .attr('y', 10)
                .attr(
                  'transform',
                  `translate(0,${
                    row_count * ISOFORM_HEIGHT + 20 + heightBuffer
                  })`,
                )
                .attr('fill', 'red')
                .attr('opacity', 1)
                .attr('height', ISOFORM_TITLE_HEIGHT)
                .html(link)
            }
          }
        })
      }
    }
    if (initialHighlight) {
      setHighlights(initialHighlight, viewer)
    }

    if (row_count === 0) {
      track
        .append('text')
        .attr('x', 30)
        .attr('y', ISOFORM_TITLE_HEIGHT + 10)
        .attr('fill', 'orange')
        .attr('opacity', 0.6)
        .text(
          'Overview of non-coding genome features unavailable at this time.',
        )
    }
    // we return the appropriate height function
    return row_count * ISOFORM_HEIGHT + heightBuffer + VARIANT_TRACK_HEIGHT
  }

  filterVariantData(variantData, variantFilter) {
    if (variantFilter.length === 0) {
      return variantData
    }
    try {
      return variantData.filter(v => {
        let returnVal = false
        try {
          if (
            variantFilter.includes(v.name) ||
            (v.allele_symbols?.values &&
              variantFilter.includes(
                v.allele_symbols.values[0].replace(/"/g, ''),
              )) ||
            (v.symbol?.values &&
              variantFilter.includes(v.symbol.values[0].replace(/"/g, ''))) ||
            (v.symbol_text?.values &&
              variantFilter.includes(v.symbol_text.values[0].replace(/"/g, '')))
          ) {
            returnVal = true
          }
          let ids = v.allele_ids.values[0].replace(/"|\[|\]| /g, '').split(',')
          ids.forEach(id => {
            if (variantFilter.includes(id)) {
              returnVal = true
            }
          })
        } catch (e) {
          console.error(
            'error processing filter with so returning anyway',
            variantFilter,
            v,
            e,
          )
          returnVal = true
        }
        return returnVal
      })
    } catch (e) {
      console.warn(
        'problem filtering variant data',
        variantData,
        variantFilter,
        e,
      )
    }
  }

  renderTooltipDescription(tooltipDiv, descriptionHtml, closeFunction) {
    tooltipDiv
      .transition()
      .duration(200)
      .style('width', 'auto')
      .style('height', 'auto')
      .style('opacity', 1)
      .style('visibility', 'visible')

    tooltipDiv
      .html(descriptionHtml)
      .style('left', `${window.event.pageX + 10}px`)
      .style('top', `${window.event.pageY + 10}px`)
      .append('button')
      .attr('type', 'button')
      .text('Close')
      .on('click', () => closeFunction())

    tooltipDiv
      .append('button')
      .attr('type', 'button')
      .html('&times;')
      .attr('class', 'tooltipDivX')
      .on('click', () => closeFunction())
  }

  setInitialHighlight(selectedAlleles, svgTarget) {
    let viewer_height = svgTarget.node().getBBox().height

    // This code needs to be simplified and put in another function
    let highlights = svgTarget
      .selectAll(
        '.variant-deletion,.variant-SNV,.variant-insertion,.variant-delins',
      )
      .filter(d => {
        let returnVal = false
        // TODO This needs to be standardized.  We sometimes get these returned in a comma sperated list
        // and sometimes in an array.
        if (d.alleles) {
          let ids = d.alleles[0].replace(/"|\[|\]| /g, '').split(',')
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
      .datum(d => {
        d.selected = 'true'
        return d
      })
      .style('stroke', 'black')

    highlights.each(function () {
      let x_val = d3.select(this).attr('x')
      let width_val = d3.select(this).attr('width')
      if (width_val == null) {
        width_val = 3
        x_val = x_val - width_val / 2
      }
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

  async populateTrack(track) {
    await Promise.all([this.getTrackData(track), this.getVariantData(track)])
  }

  /* Method for isoformTrack service call */
  async getTrackData(track) {
    this.trackData = await this.service.fetchDataFromUrl(track, 'isoform_url')
  }

  /* Method for isoformTrack service call */
  async getVariantData(track) {
    this.variantData = await this.service.fetchDataFromUrl(track, 'variant_url')
  }
}
