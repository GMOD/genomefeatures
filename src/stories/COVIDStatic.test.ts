import { beforeEach, describe, expect, it } from 'vitest'

import * as stories from './COVIDStatic.stories'
import { waitForSvgContent } from './test-helpers'
import { StaticArgs, createExampleStatic } from './util'

describe('COVIDStatic Stories', () => {
  beforeEach(() => {
    // Clear document body before each test
    document.body.innerHTML = ''
  })

  it('should render Simple story snapshot', async () => {
    const element = createExampleStatic(stories.Simple.args as StaticArgs)
    document.body.append(element)
    await waitForSvgContent(element, { timeout: 5000 })
    expect(element).toMatchSnapshot()
  }, 6000)
})
