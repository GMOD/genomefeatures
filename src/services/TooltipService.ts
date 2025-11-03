import type { Selection } from 'd3'

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
