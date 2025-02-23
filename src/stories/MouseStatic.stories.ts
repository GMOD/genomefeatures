import { createExampleStatic } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { StaticArgs } from './util'
import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'Mouse example (static files)',
  // @ts-expect-error
  render: args => createExampleStatic(args),
} satisfies Meta

export const Mouse1: StoryObj<StaticArgs> = {
  args: {
    locString: '18:11035719..11058885',
    genome: 'mouse',
    divId: 'viewerMouseExample1',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
  },
}

export const Mouse2: StoryObj<StaticArgs> = {
  args: {
    locString: '18:11042037..11052567',
    genome: 'mouse',
    divId: 'viewerMouseExample5',
    type: TRACK_TYPE.ISOFORM,
  },
}

export const Mouse3: StoryObj<StaticArgs> = {
  args: {
    locString: '17:46007760..46041588',
    genome: 'mouse',
    divId: 'viewerMouseExample4',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
  },
}

export const Mouse4: StoryObj<StaticArgs> = {
  args: {
    locString: '11:69550420..69563869',
    genome: 'mouse',
    divId: 'viewerMouseExample3',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
  },
}

export const Mouse5: StoryObj<StaticArgs> = {
  args: {
    locString: '3:115707662..115717830',
    genome: 'mouse',
    divId: 'viewerMouseExample2',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
  },
}

export const Mouse6: StoryObj<StaticArgs> = {
  args: {
    locString: '6:113619452..113636198',
    genome: 'mouse',
    divId: 'viewerMouseExample1',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  },
}

export const Mouse7: StoryObj<StaticArgs> = {
  args: {
    locString: '6:113619452..113636198',
    genome: 'mouse',
    divId: 'viewerMouseExample1NoLabel',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  },
}

export const Mouse8: StoryObj<StaticArgs> = {
  args: {
    locString: '6:113619452..113636198',
    genome: 'mouse',
    divId: 'viewerMouseExample1NoLabelAnd',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
  },
}
