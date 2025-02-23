import { createExampleApollo } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { ApolloArgs } from './util'
import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'Fly example (apollo API)',
  // @ts-expect-error
  render: args => createExampleApollo(args),
} satisfies Meta

export const Fly1: StoryObj<ApolloArgs> = {
  args: {
    locString: '2L:130639..135911',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  } satisfies ApolloArgs,
}

export const Fly2: StoryObj<ApolloArgs> = {
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    variantFilter: ['NT_033778.4:g.23975146T>C'],
  } satisfies ApolloArgs,
}

export const Fly3: StoryObj<ApolloArgs> = {
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  } satisfies ApolloArgs,
}

export const Fly4: StoryObj<ApolloArgs> = {
  args: {
    locString: '2L:130639..135911',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  } satisfies ApolloArgs,
}

export const Fly5: StoryObj<ApolloArgs> = {
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    variantFilter: ['NT_033778.4:g.23975146T>C'],
  } satisfies ApolloArgs,
}

export const Fly6: StoryObj<ApolloArgs> = {
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  } satisfies ApolloArgs,
}

export const Fly7: StoryObj<ApolloArgs> = {
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
  } satisfies ApolloArgs,
}

export const Fly8: StoryObj<ApolloArgs> = {
  args: {
    locString: '3R:22693140..22699809',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
  } satisfies ApolloArgs,
}

export const Fly9: StoryObj<ApolloArgs> = {
  args: {
    locString: '2R:23974972..23989001',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
  } satisfies ApolloArgs,
}

export const Fly10: StoryObj<ApolloArgs> = {
  args: {
    locString: '3R:22693140..22699809',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    variantFilter: ['FB:FBal0265700', 'FB:FBal0265699'],
  } satisfies ApolloArgs,
}

export const Fly11: StoryObj<ApolloArgs> = {
  args: {
    locString: '2R:18614210..18615018',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    variantFilter: ['FB:FBal0325512'],
  } satisfies ApolloArgs,
}

export const Fly12: StoryObj<ApolloArgs> = {
  args: {
    locString: 'X:2023822..2043557',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    variantFilter: ['FB:FBal0212726'],
  } satisfies ApolloArgs,
}
