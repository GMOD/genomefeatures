import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as stories from './MouseStatic.stories'
import { createExampleStatic, StaticArgs } from './util'

// Mock the fetch functions to avoid actual network calls during tests
vi.mock('../genomefeatures', () => ({
  fetchNCListData: vi.fn().mockResolvedValue({ features: [] }),
  fetchTabixVcfData: vi.fn().mockResolvedValue([]),
  GenomeFeatureViewer: vi.fn(),
}))

describe('MouseStatic Stories', () => {
  beforeEach(() => {
    // Clear document body before each test
    document.body.innerHTML = ''
  })

  it('should render Mouse1 story snapshot', () => {
    const element = createExampleStatic(stories.Mouse1.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Mouse2 story snapshot', () => {
    const element = createExampleStatic(stories.Mouse2.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Mouse3 story snapshot', () => {
    const element = createExampleStatic(stories.Mouse3.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Mouse4 story snapshot', () => {
    const element = createExampleStatic(stories.Mouse4.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Mouse5 story snapshot', () => {
    const element = createExampleStatic(stories.Mouse5.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Mouse6 story snapshot', () => {
    const element = createExampleStatic(stories.Mouse6.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Mouse7 story snapshot', () => {
    const element = createExampleStatic(stories.Mouse7.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Mouse8 story snapshot', () => {
    const element = createExampleStatic(stories.Mouse8.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })
})
