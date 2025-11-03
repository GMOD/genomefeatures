import * as d3 from 'd3'
import d3Tip from 'd3-tip'

import { calculateNewTrackPosition } from '../RenderFunctions'

import type { VariantFeature } from '../services/VariantService'
import type { Region } from '../types'
import type { Selection } from 'd3'

export default class VariantTrack {
  // Layout constants
  private static readonly TRACK_HEIGHT = 20

  private variants: VariantFeature[]
  private viewer: Selection<SVGGElement, unknown, HTMLElement | null, undefined>
  private width: number
  private height: number
  private region: Region
  private range: [number, number]

  constructor({
    region,
    viewer,
    height,
    width,
    range,
  }: {
    viewer: Selection<SVGGElement, unknown, HTMLElement | null, undefined>
    height: number
    width: number
    region: Region
    range: [number, number]
  }) {
    this.variants = []
    this.viewer = viewer
    this.width = width
    this.height = height
    this.region = region
    this.range = range
  }

  DrawTrack() {
    const viewer = this.viewer
    const variants = this.variants
    const x = d3
      .scaleLinear()
      .domain([this.region.start, this.region.end + 1])
      .range(this.range)
    const triangle = d3.symbol().type(d3.symbolTriangle).size(20)

    // Tooltip configuration
    // @ts-expect-error
    const tooltip = d3Tip()
    tooltip
      .attr('class', 'd3-tip')
      .html(
        // @ts-expect-error
        d =>
          `<table>` +
          `<th colspan="2">${'Case Variant'.toUpperCase()}</th>` +
          `<tr><td>Position</td> <td>${d.position}</td></tr>` +
          `<tr><td>Mutation</td> <td>${d.ref} > ${d.mutant}</td></tr>` +
          '</table>',
      )
      .offset([10, 0])
      .direction('s')
    viewer.call(tooltip)

    const trackHeight = VariantTrack.TRACK_HEIGHT
    const newTrackPosition = calculateNewTrackPosition(this.viewer)

    // Create our track container with a simple background
    const track = viewer
      .append('g')
      .attr('transform', `translate(0,${newTrackPosition})`)
      .attr('class', 'track')
    track
      .append('rect')
      .attr('height', trackHeight)
      .attr('width', -this.range[0] + this.range[1])
      .attr('fill-opacity', 0.1)
      .attr('fill', 'rgb(148, 140, 140)')
      .attr('stroke-width', 0)
      .attr('stroke-opacity', 0)
      .attr('transform', `translate(${this.range[0]},0)`)

    // Draw our variants
    // TODO: Variant color based on type or user defined in config?
    track
      .selectAll('path')
      .data(variants)
      .enter()
      .append('path')
      .attr('d', triangle)
      .attr('class', 'case-variant')
      .attr('stroke', 'red')
      .attr('fill', 'red')
      // @ts-expect-error
      .attr('transform', d => `translate(${x(d.position)},10)`)
      .on('mouseenter', tooltip.show)
      .on('mouseout', tooltip.hide)
  }

  async getTrackData() {
    // TODO: Implement track data fetching
  }
}
