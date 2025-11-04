export declare function waitForSvgContent(element: HTMLElement, options?: {
    timeout?: number;
    minChildren?: number;
    checkInterval?: number;
}): Promise<void>;
export declare function waitForStoryRender(element: HTMLElement, options?: {
    timeout?: number;
    checkInterval?: number;
}): Promise<void>;
