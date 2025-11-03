import type { Selection } from 'd3'

export default class BaseTrack {
  protected viewer: Selection<SVGGElement, unknown, HTMLElement | null, undefined>
  protected width: number
  protected height: number

  constructor({
    viewer,
    width,
    height,
  }: {
    viewer: Selection<SVGGElement, unknown, HTMLElement | null, undefined>
    width: number
    height: number
  }) {
    this.viewer = viewer
    this.width = width
    this.height = height
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

  DrawTrack(): number {
    return 0
  }
}
