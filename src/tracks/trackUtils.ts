import type { Selection } from 'd3'

import { checkSpace } from '../RenderFunctions'
import { getJBrowseLink, renderTrackDescription } from '../services/TrackService'
import type { SimpleFeatureSerialized } from '../services/types'

export interface DrawIsoformArgs {
  track: Selection<SVGGElement, unknown, HTMLElement, undefined>
  isoformData: SimpleFeatureSerialized[]
  x: d3.ScaleLinear<number, number, never>
  width: number
  isoformFilter: string[]
  display_feats: string[]
  tooltipDiv: Selection<HTMLDivElement, unknown, HTMLElement, undefined>
  renderTooltipDescription: (
    tooltipDiv: Selection<HTMLDivElement, unknown, HTMLElement, undefined>,
    descriptionHtml: string,
    closeFunction: () => void,
  ) => void
  closeToolTip: () => void
  viewStart: number
  viewEnd: number
  source: string
  chr: string
  variantData?: VariantFeature[]
  showVariantLabel?: boolean
}

export function drawIsoforms({
  track,
  isoformData,
  x,
  width,
  isoformFilter,
  display_feats,
  tooltipDiv,
  renderTooltipDescription,
  closeToolTip,
  viewStart,
  viewEnd,
  source,
  chr,
}: DrawIsoformArgs) {
  const MAX_ROWS = isoformFilter.length === 0 ? 9 : 30
  const UTR_feats = ['UTR', 'five_prime_UTR', 'three_prime_UTR']
  const CDS_feats = ['CDS']
  const exon_feats = ['exon']
  const EXON_HEIGHT = 10 // will be white / transparent
  const CDS_HEIGHT = 10 // will be colored in
  const ISOFORM_HEIGHT = 40 // height for each isoform
  const GENE_LABEL_HEIGHT = 20
  const ISOFORM_TITLE_HEIGHT = 0 // height for each isoform
  const UTR_HEIGHT = 10 // this is the height of the isoform running all of the way through
  const TRANSCRIPT_BACKBONE_HEIGHT = 4 // this is the height of the isoform running all of the way through
  const ARROW_HEIGHT = 20
  const ARROW_WIDTH = 10
  const ARROW_POINTS = `0,0 0,${ARROW_HEIGHT} ${ARROW_WIDTH},${ARROW_WIDTH}`

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
  let heightBuffer = 0
  let row_count = 0
  const used_space = [] as string[][]
  let fmin_display = -1
  let fmax_display = -1
  const alreadyRendered = [] as string[] // hack fix for multiple transcript returns.

  for (let i = 0; i < isoformData.length && row_count < MAX_ROWS; i++) {
    const feature = isoformData[i]
    let featureChildren = feature.children
    if (featureChildren) {
      const selected = feature.selected

      featureChildren = featureChildren.sort((a, b) =>
        a.name.localeCompare(b.name),
      )

      let warningRendered = false
      featureChildren.forEach(featureChild => {
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

        const featureType = featureChild.type

        if (display_feats.includes(featureType)) {
          let current_row = checkSpace(
            used_space,
            x(featureChild.fmin),
            x(featureChild.fmax),
          )
          if (row_count < MAX_ROWS) {
            let text_string = ''
            let text_label
            let addingGeneLabel = false
            const featName = feature.name
            if (!Object.keys(geneList).includes(featName)) {
              heightBuffer += GENE_LABEL_HEIGHT
              addingGeneLabel = true
              geneList[featName] = 'Green'
            }

            const isoform = track
              .append('g')
              .attr('class', 'isoform')
              .attr(
                'transform',
                `translate(0,${row_count * ISOFORM_HEIGHT + 10 + heightBuffer})`,
              )
            if (addingGeneLabel) {
              text_string = featName
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
                .datum({
                  fmin: featureChild.fmin,
                })
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
              .attr('transform', d =>
                feature.strand > 0
                  ? `translate(${x(d.fmax)},0)`
                  : `translate(${x(d.fmin)},${ARROW_HEIGHT}) rotate(180)`,
              )
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
              .datum({
                fmin: featureChild.fmin,
                fmax: featureChild.fmax,
              })

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
              .datum({
                fmin: featureChild.fmin,
              })

            let text_width = text_string.length * 2

            try {
              text_width = text_label.node()?.getBBox().width ?? 0
            } catch (e) {}
            if (text_width + x(featureChild.fmin) > width) {
            }
            const feat_end =
              text_width > x(featureChild.fmax) - x(featureChild.fmin)
                ? x(featureChild.fmin) + text_width
                : x(featureChild.fmax)

            if (used_space[current_row]) {
              const temp = used_space[current_row]
              temp.push(`${x(featureChild.fmin)}:${feat_end}`)
              used_space[current_row] = temp
            } else {
              used_space[current_row] = [
                `${x(featureChild.fmin)}:${feat_end}`,
              ]
            }

            if (fmin_display < 0 || fmin_display > featureChild.fmin) {
              fmin_display = featureChild.fmin
            }
            if (fmax_display < 0 || fmax_display < featureChild.fmax) {
              fmax_display = featureChild.fmax
            }

            if (featureChild.children) {
              featureChild.children = featureChild.children.sort((a, b) => {
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
                return a.type.localeCompare(b.type)
              })

              featureChild.children.forEach(innerChild => {
                const innerType = innerChild.type

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
            const link = getJBrowseLink(source, chr, viewStart, viewEnd)
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
                `translate(0,${row_count * ISOFORM_HEIGHT + 20 + heightBuffer})`,
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
  if (row_count === 0) {
    track
      .append('text')
      .attr('x', 30)
      .attr('y', ISOFORM_TITLE_HEIGHT + 10)
      .attr('fill', 'orange')
      .attr('opacity', 0.6)
      .text('Overview of non-coding genome features unavailable at this time.')
  }
  return row_count * ISOFORM_HEIGHT + heightBuffer
}
