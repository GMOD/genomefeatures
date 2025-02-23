import { createExampleApollo } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { ApolloArgs } from './util'
import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'Mouse example (Apollo API)',
  // @ts-expect-error
  render: args => createExampleApollo(args),
} satisfies Meta

export const Mouse1: StoryObj<ApolloArgs> = {
  args: {
    locString: '18:11035719..11058885',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
  } satisfies ApolloArgs,
}

export const Mouse2: StoryObj<ApolloArgs> = {
  args: {
    locString: '18:11042037..11052567',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM,
  } satisfies ApolloArgs,
}

export const Mouse3: StoryObj<ApolloArgs> = {
  args: {
    locString: '17:46007760..46041588',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
  } satisfies ApolloArgs,
}

export const Mouse4: StoryObj<ApolloArgs> = {
  args: {
    locString: '11:69550420..69563869',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
  } satisfies ApolloArgs,
}

export const Mouse5: StoryObj<ApolloArgs> = {
  args: {
    locString: '3:115707662..115717830',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
  } satisfies ApolloArgs,
}

export const Mouse6: StoryObj<ApolloArgs> = {
  args: {
    locString: '6:113619452..113636198',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  } satisfies ApolloArgs,
}

export const Mouse7: StoryObj<ApolloArgs> = {
  args: {
    locString: '6:113619452..113636198',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  } satisfies ApolloArgs,
}

export const Mouse8: StoryObj<ApolloArgs> = {
  args: {
    locString: '6:113619452..113636198',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
  } satisfies ApolloArgs,
}
