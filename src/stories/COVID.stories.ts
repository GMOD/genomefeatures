import { createCovidExampleAndSvgElement } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'COVID example',
  // @ts-expect-error
  render: args => createCovidExampleAndSvgElement(args),
} satisfies Meta

export const Simple: StoryObj = {
  args: {
    locString: 'NC_045512.2:17894..28259',
    genome: 'SARS-CoV-2',
    divId: 'mysvg',
    trackName: '/Mature%20peptides/',
    type: TRACK_TYPE.ISOFORM,
  },
}
