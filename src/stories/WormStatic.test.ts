import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as stories from './WormStatic.stories'
import { createExampleStatic, StaticArgs } from './util'

// Mock the fetch functions to avoid actual network calls during tests
vi.mock('../genomefeatures', () => ({
  fetchNCListData: vi.fn().mockResolvedValue({ features: [] }),
  fetchTabixVcfData: vi.fn().mockResolvedValue([]),
  GenomeFeatureViewer: vi.fn(),
}))

describe('WormStatic Stories', () => {
  beforeEach(() => {
    // Clear document body before each test
    document.body.innerHTML = ''
  })

  it('should render Worm1 story snapshot', () => {
    const element = createExampleStatic(stories.Worm1.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Worm2 story snapshot', () => {
    const element = createExampleStatic(stories.Worm2.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Worm3 story snapshot', () => {
    const element = createExampleStatic(stories.Worm3.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Worm4 story snapshot', () => {
    const element = createExampleStatic(stories.Worm4.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })
})
