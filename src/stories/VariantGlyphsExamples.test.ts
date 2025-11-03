import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as stories from './VariantGlyphsExamples.stories'

// Mock the fetch functions to avoid actual network calls during tests
vi.mock('../genomefeatures', () => ({
  fetchNCListData: vi.fn().mockResolvedValue({ features: [] }),
  fetchTabixVcfData: vi.fn().mockResolvedValue([]),
  GenomeFeatureViewer: vi.fn(),
}))

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
    const element = meta.render(story.args as any)

    // Give a moment for the wrapper to be created
    await new Promise(resolve => setTimeout(resolve, 10))

    expect(element).toMatchSnapshot()
  })

  it('should render FlySox14 story snapshot', async () => {
    const meta = stories.default
    const story = stories.FlySox14

    // Call the render function from the meta with story args
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const element = meta.render(story.args as any)

    // Give a moment for the wrapper to be created
    await new Promise(resolve => setTimeout(resolve, 10))

    expect(element).toMatchSnapshot()
  })
})
