import { beforeEach, describe, expect, it } from 'vitest'

import * as stories from './WormStatic.stories'
import { waitForSvgContent } from './test-helpers'
import { StaticArgs, createExampleStatic } from './util'

describe('WormStatic Stories', () => {
  beforeEach(() => {
    // Clear document body before each test
    document.body.innerHTML = ''
  })

  it('should render Worm1 story snapshot', async () => {
    const element = createExampleStatic(stories.Worm1.args as StaticArgs)
    document.body.append(element)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Worm2 story snapshot', async () => {
    const element = createExampleStatic(stories.Worm2.args as StaticArgs)
    document.body.append(element)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Worm3 story snapshot', async () => {
    const element = createExampleStatic(stories.Worm3.args as StaticArgs)
    document.body.append(element)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)

  it('should render Worm4 story snapshot', async () => {
    const element = createExampleStatic(stories.Worm4.args as StaticArgs)
    document.body.append(element)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)
})
