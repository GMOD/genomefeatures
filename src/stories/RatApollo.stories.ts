import { createExampleApollo } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { ApolloArgs } from './util'
import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'Rat example (Apollo API)',
  // @ts-expect-error
  render: args => createExampleApollo(args),
} satisfies Meta

export const Rat1: StoryObj<ApolloArgs> = {
  args: {
    locString: '10:94485648..94489071',
    genome: 'rat',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  } satisfies ApolloArgs,
}

export const Rat2: StoryObj<ApolloArgs> = {
  args: {
    locString: '10:94485648..94489071',
    genome: 'rat',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
  } satisfies ApolloArgs,
}

export const Rat3: StoryObj<ApolloArgs> = {
  args: {
    locString: '1:34987290..35280466',
    genome: 'rat',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  } satisfies ApolloArgs,
}

export const Rat4: StoryObj<ApolloArgs> = {
  args: {
    locString: '1:34987290..35280466',
    genome: 'rat',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  } satisfies ApolloArgs,
}
