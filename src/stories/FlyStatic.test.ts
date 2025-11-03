import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as stories from './FlyStatic.stories'
import { createExampleStatic, StaticArgs } from './util'

// Mock the fetch functions to avoid actual network calls during tests
vi.mock('../genomefeatures', () => ({
  fetchNCListData: vi.fn().mockResolvedValue({ features: [] }),
  fetchTabixVcfData: vi.fn().mockResolvedValue([]),
  GenomeFeatureViewer: vi.fn(),
}))

describe('FlyStatic Stories', () => {
  beforeEach(() => {
    // Clear document body before each test
    document.body.innerHTML = ''
  })

  it('should render Fly1 story snapshot', () => {
    const element = createExampleStatic(stories.Fly1.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Fly2 story snapshot', () => {
    const element = createExampleStatic(stories.Fly2.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Fly3 story snapshot', () => {
    const element = createExampleStatic(stories.Fly3.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Fly4 story snapshot', () => {
    const element = createExampleStatic(stories.Fly4.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Fly5 story snapshot', () => {
    const element = createExampleStatic(stories.Fly5.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Fly6 story snapshot', () => {
    const element = createExampleStatic(stories.Fly6.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Fly7 story snapshot', () => {
    const element = createExampleStatic(stories.Fly7.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Fly8 story snapshot', () => {
    const element = createExampleStatic(stories.Fly8.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Fly9 story snapshot', () => {
    const element = createExampleStatic(stories.Fly9.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Fly10 story snapshot', () => {
    const element = createExampleStatic(stories.Fly10.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Fly11 story snapshot', () => {
    const element = createExampleStatic(stories.Fly11.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })

  it('should render Fly12 story snapshot', () => {
    const element = createExampleStatic(stories.Fly12.args as StaticArgs)
    expect(element).toMatchSnapshot()
  })
})
