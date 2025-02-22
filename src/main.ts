import * as d3 from 'd3'

import Drawer from './Drawer'
import { setHighlights } from './RenderFunctions'
import { createLegendBox } from './services/LegenedService'

interface Track {
  start: number
  end: number
  range: [number, number]
  chromosome: string
  genome: string
  type: string
  label?: string
  id: string
  isoform_url: string[]
  variant_url: string[]
  url: string[]
}

interface ViewerConfig {
  locale: 'global' | 'local'
  tracks?: Track[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service?: any
  start: number
  end: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

/*
 * Main viewer.
 *
 * @Param config: A configuration file full of tracks & metadata
 * @Param svg_target: The id of an svg element
 * @Param height: height of svg
 * @Param width: width of svg
 */
export default class MainGenomeFeatureViewer {
  public tracks: Track[]
  public locale: string
  public config: ViewerConfig
  public height: number
  public width: number
  public drawer: Drawer
  public svg_target: string

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public viewer: d3.Selection<SVGGElement, unknown, HTMLElement | null, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public service: any

  constructor(
    config: ViewerConfig,
    svg_target: string,
    width: number,
    height: number,
  ) {
    this.tracks = []
    this._extendD3()
    this.height = height
    this.width = width
    this.config = config
    this.tracks = config.tracks ?? []
    this.locale = config.locale
    this.svg_target = svg_target
    this.viewer = this._initViewer(svg_target)
    this.drawer = new Drawer(this)
    this.service = config.service

    this.drawer.draw()
  }

  generateLegend() {
    return createLegendBox()
  }

  closeModal() {
    const elements = document.getElementsByClassName('gfc-tooltip')
    for (const tooltipDiv of elements) {
      ;(tooltipDiv as HTMLElement).style.visibility = 'hidden'
    }
  }

  setSelectedAlleles(selectedAlleles: string[], target: string): void {
    // remove highlights first
    const svgTarget = d3.select(target)
    svgTarget.selectAll('.highlight').remove()
    svgTarget
      .selectAll(
        '.variant-deletion,.variant-SNV,.variant-insertion,.variant-delins',
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .filter((d: any) => d.selected)
      .style('stroke', null)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .datum((d: any) => {
        d.selected = 'false'
        return d
      })

    // @ts-expect-error
    setHighlights(selectedAlleles, svgTarget)
  }

  // Create an extension on our d3
  private _extendD3(): void {
    d3.selection.prototype.first = function () {
      return d3.select(this.nodes()[0])
    }
    d3.selection.prototype.last = function () {
      return d3.select(this.nodes()[this.size() - 1])
    }
  }

  // Creating our drawing space.
  private _initViewer(svg_target: string) {
    d3.select(svg_target).selectAll('*').remove()
    const viewer = d3.select(svg_target)
    const svgClass = svg_target.replace('#', '')
    const mainViewClass = `${svgClass} main-view`

    if (this.locale === 'global') {
      const margin = { top: 8, right: 30, bottom: 30, left: 40 }
      viewer
        .attr('width', this.width)
        .attr('height', this.height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .attr('class', mainViewClass)
      this.width = this.width - margin.left - margin.right
      this.height = this.height - margin.top - margin.bottom
    } else {
      // Different margins for a local view. (Maybe we can make these match at
      // some point)
      const margin = { top: 10, bottom: 10 }
      viewer
        .attr('width', this.width)
        .attr('height', this.height)
        .append('g')
        .attr('class', mainViewClass)
      this.height = this.height - margin.top - margin.bottom
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return d3.select<SVGGElement, any>(`${svg_target} .main-view`)
  }

  getTracks(defaultTrack?: boolean): Track | Track[] {
    // Return all tracks if a default track
    // is not requested
    return !defaultTrack ? this.tracks : this.tracks[0]
  }

  // Set our sequence start and sequence end
  setSequence(start: number, end: number): void {
    this.config.start = start
    this.config.end = end
  }
}
