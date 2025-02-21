import * as d3 from 'd3'

import { calculateNewTrackPosition } from '../RenderFunctions'

export default class VariantTrack {
  constructor(viewer, track, height, width) {
    this.variants = []
    this.viewer = viewer
    this.width = width
    this.height = height
    this.track = track
  }

  DrawTrack() {
    let viewer = this.viewer
    let variants = this.variants
    let x = d3
      .scaleLinear()
      .domain([this.track.start, this.track.end])
      .range(this.track.range)
    let triangle = d3.symbol().type(d3.symbolTriangle).size(20)

    let trackHeight = 20
    let newTrackPosition = calculateNewTrackPosition(this.viewer)

    // Create our track container with a simple background
    let track = viewer
      .append('g')
      .attr('transform', `translate(0,${newTrackPosition})`)
      .attr('class', 'track')

    track
      .append('rect')
      .attr('height', trackHeight)
      .attr('width', -this.track.range[0] + this.track.range[1])
      .attr('fill-opacity', 0.1)
      .attr('fill', 'rgb(148, 140, 140)')
      .attr('stroke-width', 0)
      .attr('stroke-opacity', 0)

    // Draw our variants
    // Global Size based on amount of variants?
    track
      .selectAll('path')
      .data(variants)
      .enter()
      .append('path')
      .attr('d', triangle)
      .attr('class', 'global-variant')
      .attr('stroke', 'red')
      .attr('fill', 'red')
      .attr('transform', function (d) {
        return `translate(${x(d.position)},10)`
      })
  }

  /* Method to get reference label */
  async getTrackData() {
    // this.variants = await new ApolloService().GetFakeGlobalVariants()
  }
}
