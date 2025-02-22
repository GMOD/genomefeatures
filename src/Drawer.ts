import * as d3 from 'd3'

import { getTranslate } from './RenderFunctions'
import GenomeFeatureViewer from './main'
import IsoformAndVariantTrack from './tracks/IsoformAndVariantTrack'
import IsoformEmbeddedVariantTrack from './tracks/IsoformEmbeddedVariantTrack'
import IsoformTrack from './tracks/IsoformTrack'
import ReferenceTrack from './tracks/ReferenceTrack'
import { TRACK_TYPE } from './tracks/TrackTypeEnum'
import VariantTrack from './tracks/VariantTrack'
import VariantTrackGlobal from './tracks/VariantTrackGlobal'

declare module 'd3' {
  interface Selection<
    GElement extends d3.BaseType,
    Datum,
    PElement extends d3.BaseType,
    PDatum,
  > {
    first(): Selection<GElement, Datum, PElement, PDatum>
    last(): Selection<GElement, Datum, PElement, PDatum>
  }
}

const LABEL_OFFSET = 100

export default class Drawer {
  private gfc: GenomeFeatureViewer
  private used: number
  private drag_cx: number
  private drag_prev: number
  private range: number[]

  constructor(gfc: GenomeFeatureViewer) {
    this.gfc = gfc
    this.used = 0
    this.drag_cx = 0
    this.drag_prev = 0
    this.range = []
  }

  draw() {
    let width = this.gfc.width
    const transcriptTypes = this.gfc.config.transcriptTypes ?? ['mRNA']
    const variantTypes = this.gfc.config.variantTypes ?? [
      'point_mutation',
      'MNV',
      'Deletion',
      'Insertion',
      'Delins',
    ]
    const binRatio = this.gfc.config.binRatio ?? 0.01
    let draggingViewer = null
    let draggingStart = null

    if (this.gfc.locale === 'local') {
      width = document.body.clientWidth
      // Other setup
      draggingViewer = () => {
        this.dragged(this)
      }
      draggingStart = () => {
        this.drag_start(this)
      }
      // Setting our clip path view to enable the scrolling effect
      d3.select(this.gfc.svg_target)
        .append('defs')
        .append('svg:clipPath')
        .attr('id', 'clip')
        .append('rect')
        .attr('id', 'clip-rect')
        .attr('x', '0')
        .attr('y', '0')
        .attr('height', this.gfc.height)
        .attr('width', this.gfc.width - LABEL_OFFSET)
        .attr('transform', `translate(${LABEL_OFFSET},0)`)
      this.gfc.viewer.attr('clip-path', 'url(#clip)')
    }

    const options = this.gfc.config
    // Sequence information
    const sequenceOptions = this._configureRange(
      options.start,
      options.end,
      width,
    )
    this.range = sequenceOptions.range
    const chromosome = options.chromosome
    const variantFilter = options.variantFilter ?? []
    const isoformFilter = options.isoformFilter ?? []
    const initialHighlight = options.initialHighlight ?? []
    const htpVariant = options.htpVariant ?? ''
    const start = sequenceOptions.start
    const end = sequenceOptions.end

    // Draw our reference if it's local for now.
    const referenceTrack = new ReferenceTrack({
      viewer: this.gfc.viewer,
      track: {
        chromosome,
        start,
        end,
        range: sequenceOptions.range,
      },
      height: this.gfc.height,
      width,
    })
    if (this.gfc.locale === 'local') {
      // Scrollable View
      // await referenceTrack.getTrackData()
      referenceTrack.DrawScrollableTrack()

      // Colin NOTE: not sure what does
      // @ts-expect-error
      this.gfc.viewer.call(
        // @ts-expect-error
        d3.drag().on('start', draggingStart).on('drag', draggingViewer),
      )
    } else {
      referenceTrack.DrawOverviewTrack()
    }

    let track_height = LABEL_OFFSET

    Promise.all(
      this.gfc.tracks.map(async baseTrack => {
        const track = {
          ...baseTrack,
          start,
          end,
          chromosome,
          variant_filter: variantFilter,
          isoform_filter: isoformFilter,
          initialHighlight,
        }
        if (track.type === TRACK_TYPE.ISOFORM_AND_VARIANT) {
          const isoformVariantTrack = new IsoformAndVariantTrack({
            viewer: this.gfc.viewer,
            height: this.gfc.height,
            width,
            transcriptTypes,
            variantTypes,
            showVariantLabel: this.gfc.config.showVariantLabel,
            variantFilter,
            binRatio,
            isoformFilter,
            service: this.gfc.service,
          })
          track_height += await isoformVariantTrack.DrawTrack(track)
        } else if (track.type === TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT) {
          const isoformVariantTrack = new IsoformEmbeddedVariantTrack({
            viewer: this.gfc.viewer,
            height: this.gfc.height,
            width,
            transcriptTypes,
            variantTypes,
            showVariantLabel: this.gfc.config.showVariantLabel,
            variantFilter,
            service: this.gfc.service,
          })
          await isoformVariantTrack.populateTrack(track)
          track_height += isoformVariantTrack.DrawTrack()
        } else if (track.type === TRACK_TYPE.ISOFORM) {
          const isoformTrack = new IsoformTrack({
            viewer: this.gfc.viewer,
            track,
            height: this.gfc.height,
            width,
            transcriptTypes,
            htpVariant,
            service: this.gfc.service,
          })
          await isoformTrack.getTrackData(track)
          track_height += isoformTrack.DrawTrack()
        } else if (track.type === TRACK_TYPE.VARIANT) {
          track.range = sequenceOptions.range
          // @ts-expect-error
          const variantTrack = new VariantTrack({
            viewer: this.gfc.viewer,
            track,
            height: this.gfc.height,
            width,
            service: this.gfc.service,
          })
          await variantTrack.getTrackData()
          variantTrack.DrawTrack()
        } else if (track.type === TRACK_TYPE.VARIANT_GLOBAL) {
          track.range = sequenceOptions.range
          const variantTrack = new VariantTrackGlobal({
            viewer: this.gfc.viewer,
            track,
            height: this.gfc.height,
            width,
          })
          await variantTrack.getTrackData()
          variantTrack.DrawTrack()
        } else {
          console.error(`TrackType not found for ${track.id}...`, track.type)
        }
        d3.select(this.gfc.svg_target).attr('height', track_height)
      }),
    ).catch((e: unknown) => {
      console.error(e)
    })
  }

  // Trigger for when we start dragging. Save the initial point.
  drag_start(ref: Drawer) {
    // @ts-expect-error
    ref.drag_cx = window.event.x
  }

  // Trigger while we are dragging. Figure out the direction
  // and get the amount to scroll by.
  //
  // @Param ref, a reference to the drawer class since event methods
  // scope of this becomes the element it triggers on.
  dragged(ref: Drawer) {
    // Get tick size for our scroll value
    const viewerTicks = `${ref.gfc.svg_target} .x-local-axis .tick`
    const scrollValue =
      // @ts-expect-error
      parseInt(d3.select(viewerTicks).node().getBoundingClientRect().width) * 2

    // @ts-expect-error
    if (ref.drag_cx != window.event.x) {
      // Figure out which way the user wants to go.
      // 1 -> going up
      // -1 -> going
      let direction = 0
      // @ts-expect-error
      direction = ref.drag_cx < window.event.x ? 1 : -1
      ref.scrollView(direction, scrollValue)
      // Always want to compare next drag direction compared to previous to
      // enable smooth back and forth scrolling
      // @ts-expect-error
      ref.drag_cx = window.event.x
    }
  }

  // Function to scroll our local view
  // @Param direction: The direction of the scroll
  //        1 -> going up
  //        -1 -> going down
  // @Param scrollValue: The amount you want to move the view.
  //                    Typically you get the tick size then multiply.
  scrollView(direction: number, scrollValue: number) {
    // We want to move the track in a direction when dragging thresholds for
    // end of the sequence
    const dragThresh = {
      maxNegative: this.gfc.width - this.range[1] + -(scrollValue / 2),
    }

    // We are moving get our elements and translate them the distance of a
    // tick.
    const viewerTracks = `${this.gfc.svg_target} .main-view .track`
    d3.selectAll(viewerTracks).attr('transform', function () {
      const trs = getTranslate(d3.select(this).attr('transform'))
      let newX = 0
      if (direction == 1) {
        newX = trs[0] + scrollValue
      } else if (direction == -1) {
        newX = trs[0] - scrollValue
      }

      // Want to make sure we don't go beyond our sequence length. Which is
      // defined by our range.
      return newX <= dragThresh.maxNegative ||
        // @ts-expect-error
        newX > -this.range[0] + 100 + scrollValue / 2
        ? `translate(${trs[0]},${trs[1]})`
        : `translate(${newX},${trs[1]})`
    })
  }

  // Configure the range for our tracks two use cases
  //    1. Entered with a position
  //    2. TODO: Entered with a range start at 0?
  //    3. Are we in overview or scrollable?
  _configureRange(
    start: number,
    end: number,
    width: number,
  ): { start: number; end: number; range: [number, number] } {
    let sequenceLength = null
    const desiredScaling = 17 // most optimal for ~50bp in the view.
    let rangeWidth = 0
    let range: [number, number] = [0, 0]

    // We have entered with a variant position
    // create our sequence 'padding'
    // ex. position 20, we want total 100 nucelotides
    // (20 - 49) & (50 + 20)
    // definitely in scrollable
    if (start === end) {
      sequenceLength = 300 // hardcode 150 to each end.
      rangeWidth = desiredScaling * sequenceLength
      start = start - sequenceLength / 2 - 1
      end = end + sequenceLength / 2

      // Plus 100 for the label offset.
      const middleOfView =
        // @ts-expect-error
        d3.select('#clip-rect').node()!.getBoundingClientRect().width / 2 + 100

      range = [
        middleOfView - rangeWidth / 2,
        middleOfView + rangeWidth / 2,
      ] as const
    } else {
      // This statement will not work with scrollable setting and a defined range
      // TODO: FIX THIS
      return {
        range: [0, width] as const,
        start: start,
        end: end,
      }
    }

    return {
      range,
      start,
      end,
    }
  }
}
