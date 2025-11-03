import * as d3 from 'd3'

import type { Selection } from 'd3'

/**
 * Creates a tooltip div element attached to the body
 * @returns d3 Selection of the tooltip div
 */
export function createTooltipDiv(): Selection<
  HTMLDivElement,
  unknown,
  HTMLElement,
  unknown
> {
  return d3
    .select('body')
    .append('div')
    .attr('class', 'gfc-tooltip')
    .style('visibility', 'visible')
    .style('opacity', 0)
}

/**
 * Creates a function to close/hide the tooltip
 * @param tooltipDiv - The tooltip div selection
 * @returns Function that hides the tooltip
 */
export function createCloseTooltipFunction(
  tooltipDiv: Selection<HTMLDivElement, unknown, HTMLElement, unknown>,
): () => void {
  return () => {
    tooltipDiv
      .transition()
      .duration(100)
      .style('opacity', 0)
      .style('visibility', 'hidden')
  }
}

export function renderTooltipDescription(
  tooltipDiv: Selection<HTMLDivElement, unknown, HTMLElement, unknown>,
  descriptionHtml: string,
  closeFunction: () => void,
  event: MouseEvent,
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
    .style('left', `${event.pageX + 10}px`)
    .style('top', `${event.pageY + 10}px`)
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
