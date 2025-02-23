import { createExampleAndSvgElement } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'Worm example',
  // @ts-expect-error
  render: args => createExampleAndSvgElement(args),
} satisfies Meta

export const Worm1: StoryObj = {
  args: {
    locString: 'V:7106..57424',
    genome: 'worm',
    divId: 'viewerWormExample1',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    showLabels: true,
  },
}

export const Worm2: StoryObj = {
  args: {
    locString: 'V:7106..57424',
    genome: 'worm',
    divId: 'viewerWormEgl8NoLabel',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    showLabels: false,
  },
}

export const Worm3: StoryObj = {
  args: {
    locString: 'V:7114..57432',
    genome: 'worm',
    divId: 'networkExampleWorm1',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    showLabels: true,
  },
}

export const Worm4: StoryObj = {
  args: {
    locString: 'V:7114..57432',
    genome: 'worm',
    divId: 'networkExampleWorm1And',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    showLabels: true,
  },
}
