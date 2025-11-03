import { beforeEach, describe, expect, it } from 'vitest'

import * as stories from './MouseStatic.stories'
import { waitForSvgContent } from './test-helpers'
import { StaticArgs, createExampleStatic } from './util'

describe('MouseStatic Stories', () => {
  beforeEach(() => {
    // Clear document body before each test
    document.body.innerHTML = ''
  })

  it('should render Mouse1 story snapshot', async () => {
    const element = createExampleStatic(stories.Mouse1.args as StaticArgs)
    document.body.append(element)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Mouse2 story snapshot', async () => {
    const element = createExampleStatic(stories.Mouse2.args as StaticArgs)
    document.body.append(element)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Mouse3 story snapshot', async () => {
    const element = createExampleStatic(stories.Mouse3.args as StaticArgs)
    document.body.append(element)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Mouse4 story snapshot', async () => {
    const element = createExampleStatic(stories.Mouse4.args as StaticArgs)
    document.body.append(element)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Mouse5 story snapshot', async () => {
    const element = createExampleStatic(stories.Mouse5.args as StaticArgs)
    document.body.append(element)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Mouse6 story snapshot', async () => {
    const element = createExampleStatic(stories.Mouse6.args as StaticArgs)
    document.body.append(element)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Mouse7 story snapshot', async () => {
    const element = createExampleStatic(stories.Mouse7.args as StaticArgs)
    document.body.append(element)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Mouse8 story snapshot', async () => {
    const element = createExampleStatic(stories.Mouse8.args as StaticArgs)
    document.body.append(element)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)
})
