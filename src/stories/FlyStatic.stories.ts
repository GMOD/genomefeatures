import { createExampleAndSvgElementStatic } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'Fly example (static file fetching)',
  // @ts-expect-error
  render: args => createExampleAndSvgElementStatic(args),
} satisfies Meta

export const Fly1: StoryObj = {
  args: {
    locString: '2L:130639..135911',
    genome: 'fly',
    divId: 'mysvg',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  },
}
