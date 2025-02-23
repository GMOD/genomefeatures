import { createPage } from './Page'

import type { Meta, StoryObj } from '@storybook/html'

const meta = {
  title: 'Example/Page',
  render: () => createPage(),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta

export const Page: StoryObj = {}
