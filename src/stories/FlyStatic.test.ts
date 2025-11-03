import { describe, it, expect, beforeEach } from 'vitest'
import * as stories from './FlyStatic.stories'
import { createExampleStatic, StaticArgs } from './util'
import { waitForSvgContent } from './test-helpers'

describe('FlyStatic Stories', () => {
  beforeEach(() => {
    // Clear document body before each test
    document.body.innerHTML = ''
  })

  it('should render Fly1 story snapshot', async () => {
    const element = createExampleStatic(stories.Fly1.args as StaticArgs)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Fly2 story snapshot', async () => {
    const element = createExampleStatic(stories.Fly2.args as StaticArgs)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Fly3 story snapshot', async () => {
    const element = createExampleStatic(stories.Fly3.args as StaticArgs)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Fly4 story snapshot', async () => {
    const element = createExampleStatic(stories.Fly4.args as StaticArgs)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Fly5 story snapshot', async () => {
    const element = createExampleStatic(stories.Fly5.args as StaticArgs)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Fly6 story snapshot', async () => {
    const element = createExampleStatic(stories.Fly6.args as StaticArgs)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Fly7 story snapshot', async () => {
    const element = createExampleStatic(stories.Fly7.args as StaticArgs)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Fly8 story snapshot', async () => {
    const element = createExampleStatic(stories.Fly8.args as StaticArgs)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Fly9 story snapshot', async () => {
    const element = createExampleStatic(stories.Fly9.args as StaticArgs)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Fly10 story snapshot', async () => {
    const element = createExampleStatic(stories.Fly10.args as StaticArgs)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Fly11 story snapshot', async () => {
    const element = createExampleStatic(stories.Fly11.args as StaticArgs)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Fly12 story snapshot', async () => {
    const element = createExampleStatic(stories.Fly12.args as StaticArgs)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)
})
