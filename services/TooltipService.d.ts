import { Selection } from 'd3';
export declare function createTooltipDiv(): Selection<HTMLDivElement, unknown, HTMLElement, unknown>;
export declare function createCloseTooltipFunction(tooltipDiv: Selection<HTMLDivElement, unknown, HTMLElement, unknown>): () => void;
export declare function renderTooltipDescription(tooltipDiv: Selection<HTMLDivElement, unknown, HTMLElement, unknown>, descriptionHtml: string, closeFunction: () => void, event: MouseEvent): void;
