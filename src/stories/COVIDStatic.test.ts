import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as stories from './COVIDStatic.stories'
import { createExampleStatic, StaticArgs } from './util'

// Mock the fetch functions to avoid actual network calls during tests
vi.mock('../genomefeatures', () => ({
  fetchNCListData: vi.fn().mockResolvedValue({ features: [] }),
  fetchTabixVcfData: vi.fn().mockResolvedValue([]),
  GenomeFeatureViewer: vi.fn(),
}))

describe('COVIDStatic Stories', () => {
  beforeEach(() => {
    // Clear document body before each test
    document.body.innerHTML = ''
  })

  it('should render Simple story snapshot', () => {
    const element = createExampleStatic(stories.Simple.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })
})
