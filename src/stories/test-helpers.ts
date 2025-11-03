/**
 * Waits for an SVG element to be populated with content by polling for child elements.
 * More reliable than arbitrary setTimeout delays.
 */
export function waitForSvgContent(
  element: HTMLElement,
  options: {
    timeout?: number
    minChildren?: number
    checkInterval?: number
  } = {},
): Promise<void> {
  const { timeout = 5000, minChildren = 1, checkInterval = 50 } = options

  return new Promise((resolve, reject) => {
    const startTime = Date.now()

    const checkContent = () => {
      const svg = element.querySelector('svg')

      if (!svg) {
        if (Date.now() - startTime > timeout) {
          reject(new Error('Timeout: SVG element not found'))
          return
        }
        setTimeout(checkContent, checkInterval)
        return
      }

      // Check if SVG has been populated with child elements
      const childCount = svg.children.length

      if (childCount >= minChildren) {
        // Give a small buffer for any final rendering
        setTimeout(() => {
          resolve()
        }, 50)
        return
      }

      if (Date.now() - startTime > timeout) {
        reject(
          new Error(
            `Timeout: SVG only has ${childCount} children, expected at least ${minChildren}`,
          ),
        )
        return
      }

      setTimeout(checkContent, checkInterval)
    }

    checkContent()
  })
}

/**
 * Waits for async data fetching and rendering to complete by checking for loading indicators
 * and SVG content.
 */
export function waitForStoryRender(
  element: HTMLElement,
  options: {
    timeout?: number
    checkInterval?: number
  } = {},
): Promise<void> {
  const { timeout = 5000, checkInterval = 50 } = options

  return new Promise((resolve, reject) => {
    const startTime = Date.now()

    const checkRender = () => {
      // Check if there's a loading indicator that has completed
      const loadingDiv = element.querySelector('div')
      const svg = element.querySelector('svg')

      if (!svg) {
        if (Date.now() - startTime > timeout) {
          reject(new Error('Timeout: SVG element not found'))
          return
        }
        setTimeout(checkRender, checkInterval)
        return
      }

      // Check if SVG has meaningful content (groups, paths, etc.)
      const hasContent = svg.querySelector('g, path, rect, circle, line, text')

      if (hasContent) {
        // Give a small buffer for any final rendering
        setTimeout(() => {
          resolve()
        }, 50)
        return
      }

      if (Date.now() - startTime > timeout) {
        reject(new Error('Timeout: SVG rendered but has no content'))
        return
      }

      setTimeout(checkRender, checkInterval)
    }

    checkRender()
  })
}
