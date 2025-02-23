import { createExampleStatic } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { StaticArgs } from './util'
import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'COVID example (static files)',
  // @ts-expect-error
  render: args => createExampleStatic(args),
} satisfies Meta

export const Simple: StoryObj<StaticArgs> = {
  args: {
    locString: 'NC_045512.2:17894..28259',
    genome: 'SARS-CoV-2',
    divId: 'mysvg',
    type: TRACK_TYPE.ISOFORM,
  },
}
