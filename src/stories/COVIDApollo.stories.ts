import { createExampleApollo } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { ApolloArgs } from './util'
import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'COVID example (Apollo API)',
  // @ts-expect-error
  render: args => createExampleApollo(args),
} satisfies Meta

export const Simple: StoryObj<ApolloArgs> = {
  args: {
    locString: 'NC_045512.2:17894..28259',
    genome: 'SARS-CoV-2',
    trackName: 'Mature peptides',
    type: TRACK_TYPE.ISOFORM,
  } satisfies ApolloArgs,
}
