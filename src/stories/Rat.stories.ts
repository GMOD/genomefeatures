import { createExampleAndSvgElement } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'Rat example',
  // @ts-expect-error
  render: args => createExampleAndSvgElement(args),
} satisfies Meta

export const Rat1: StoryObj = {
  args: {
    locString: '10:94485648..94489071',
    genome: 'rat',
    divId: 'mysvg',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  },
}

export const Rat2: StoryObj = {
  args: {
    locString: '10:94485648..94489071',
    genome: 'rat',
    divId: 'networkExampleRat1And',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    showLabels: true,
  },
}

export const Rat3: StoryObj = {
  args: {
    locString: '1:34987290..35280466',
    genome: 'rat',
    divId: 'viewerRatExample1',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    showLabels: true,
  },
}

export const Rat4: StoryObj = {
  args: {
    locString: '1:34987290..35280466',
    genome: 'rat',
    divId: 'viewerRatExample1NoLabel',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    showLabels: false,
  },
}
