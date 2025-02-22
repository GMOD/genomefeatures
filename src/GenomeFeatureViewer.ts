import * as d3 from 'd3'
import { Selection } from 'd3'

import Drawer from './Drawer'
import { setHighlights } from './RenderFunctions'
import { createLegendBox } from './services/LegenedService'

type Track = Record<string, any>;

interface Config {
  locale: string
  tracks: Track[]
  start?: number
  end?: number
  [key: string]: any
}

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

export default class GenomeFeatureViewer {
  private tracks: Track[]
  private locale: string
  private config: Config
  private svg_target: string
  private height: number
  private width: number
  private viewer: Selection<any, unknown, HTMLElement, any>
  private drawer: Drawer

  constructor(
    config: Config,
    svg_target: string,
    width: number,
    height: number,
  ) {
    this.tracks = []
    this.locale = ''
    this.svg_target = svg_target
    this._extendD3()
    this.height = height
    this.width = width
    this.config = config
    this.tracks = config.tracks
    this.locale = config.locale

    this.viewer = this._initViewer(svg_target)
    this.drawer = new Drawer(this)

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

  setSelectedAlleles(selectedAlleles: string[], target: string) {
    const svgTarget = d3.select<SVGGElement, unknown>(target)
    svgTarget.selectAll('.highlight').remove()
    svgTarget
      .selectAll<SVGGElement, { selected: string }>(
        '.variant-deletion,.variant-SNV,.variant-insertion,.variant-delins',
      )
      .filter(d => d.selected === 'true')
      .style('stroke', null)
      .datum(d => {
        d.selected = 'false'
        return d
      })

    setHighlights(selectedAlleles, svgTarget)
  }

  private _extendD3(): void {
    d3.selection.prototype.first = function () {
      return d3.select(this.nodes()[0])
    }
    d3.selection.prototype.last = function () {
      return d3.select(this.nodes()[this.size() - 1])
    }
  }

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
      const margin = { top: 10, bottom: 10 }
      viewer
        .attr('width', this.width)
        .attr('height', this.height)
        .append('g')
        .attr('class', mainViewClass)
      this.height = this.height - margin.top - margin.bottom
    }
    const mainViewTarget = `${svg_target} .main-view`
    return d3.select(mainViewTarget)
  }

  getTracks(defaultTrack?: boolean): Track[] | Track {
    return !defaultTrack ? this.tracks : this.tracks[0]
  }

  setSequence(start: number, end: number): void {
    this.config.start = start
    this.config.end = end
  }
}
