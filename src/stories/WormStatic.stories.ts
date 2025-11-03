import { createExampleStatic } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { StaticArgs } from './util'
import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'Worm example',
  // @ts-expect-error
  render: args => createExampleStatic(args),
} satisfies Meta

const baseUrl =
  (globalThis as { LOCAL_DATA_SERVER?: string }).LOCAL_DATA_SERVER ??
  (typeof window !== 'undefined' ? window.location.origin : '')
const vcfTabixUrl = `${baseUrl}/s3.amazonaws.com/agrjbrowse/VCF/7.0.0/worm-latest.vcf.gz`
const ncListUrlTemplate = `${baseUrl}/s3.amazonaws.com/agrjbrowse/docker/7.0.0/WormBase/c_elegans_PRJNA13758/tracks/All_Genes/{refseq}/trackData.jsonz`
export const Worm1: StoryObj<StaticArgs> = {
  args: {
    locString: 'V:7106..57424',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    vcfTabixUrl,
    ncListUrlTemplate,
  } satisfies StaticArgs,
}

export const Worm2: StoryObj<StaticArgs> = {
  args: {
    locString: 'V:7106..57424',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    vcfTabixUrl,
    ncListUrlTemplate,
  } satisfies StaticArgs,
}

export const Worm3: StoryObj<StaticArgs> = {
  args: {
    locString: 'V:7114..57432',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    vcfTabixUrl,
    ncListUrlTemplate,
  } satisfies StaticArgs,
}

export const Worm4: StoryObj<StaticArgs> = {
  args: {
    locString: 'V:7114..57432',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    vcfTabixUrl,
    ncListUrlTemplate,
  } satisfies StaticArgs,
}
