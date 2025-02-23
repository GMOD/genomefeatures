import { createExampleStatic } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { StaticArgs } from './util'
import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'Rat example (static files)',
  // @ts-expect-error
  render: args => createExampleStatic(args),
} satisfies Meta

export const Rat1: StoryObj<StaticArgs> = {
  args: {
    locString: '10:94485648..94489071',
    genome: 'rat',
    divId: 'mysvg',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  },
}

export const Rat2: StoryObj<StaticArgs> = {
  args: {
    locString: '10:94485648..94489071',
    genome: 'rat',
    divId: 'networkExampleRat1And',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
  },
}

export const Rat3: StoryObj<StaticArgs> = {
  args: {
    locString: '1:34987290..35280466',
    genome: 'rat',
    divId: 'viewerRatExample1',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  },
}

export const Rat4: StoryObj<StaticArgs> = {
  args: {
    locString: '1:34987290..35280466',
    genome: 'rat',
    divId: 'viewerRatExample1NoLabel',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  },
}
