import { beforeEach, describe, expect, it } from 'vitest'

import * as stories from './VariantGlyphsExamples.stories'
import { waitForStoryRender } from './test-helpers'

describe('VariantGlyphsExamples Stories', () => {
  beforeEach(() => {
    // Clear document body before each test
    document.body.innerHTML = ''
  })

  it('should render MousePTEN story snapshot', async () => {
    const meta = stories.default
    const story = stories.MousePTEN

    // Call the render function from the meta with story args
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = meta.render(story.args as any) as HTMLElement
    document.body.append(element)

    // Wait for the async rendering to complete
    await waitForStoryRender(element, { timeout: 5000 })

    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render FlySox14 story snapshot', async () => {
    const meta = stories.default
    const story = stories.FlySox14

    // Call the render function from the meta with story args
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = meta.render(story.args as any) as HTMLElement
    document.body.append(element)

    // Wait for the async rendering to complete
    await waitForStoryRender(element, { timeout: 5000 })

    expect(element).toMatchSnapshot()
  }, 6000)
})
