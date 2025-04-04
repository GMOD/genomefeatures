import { createExampleApollo } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { ApolloArgs } from './util'
import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'Worm example (apollo API)',
  // @ts-expect-error
  render: args => createExampleApollo(args),
} satisfies Meta

export const Worm1: StoryObj<ApolloArgs> = {
  args: {
    locString: 'V:7106..57424',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  } satisfies ApolloArgs,
}

export const Worm2: StoryObj<ApolloArgs> = {
  args: {
    locString: 'V:7106..57424',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  } satisfies ApolloArgs,
}

export const Worm3: StoryObj<ApolloArgs> = {
  args: {
    locString: 'V:7114..57432',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  } satisfies ApolloArgs,
}

export const Worm4: StoryObj<ApolloArgs> = {
  args: {
    locString: 'V:7114..57432',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
  } satisfies ApolloArgs,
}
