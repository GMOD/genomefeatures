import { describe, it, expect, beforeEach } from 'vitest'
import * as stories from './COVIDStatic.stories'
import { createExampleStatic, StaticArgs } from './util'
import { waitForSvgContent } from './test-helpers'

describe('COVIDStatic Stories', () => {
  beforeEach(() => {
    // Clear document body before each test
    document.body.innerHTML = ''
  })

  it('should render Simple story snapshot', async () => {
    const element = createExampleStatic(stories.Simple.args as StaticArgs)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)
})
