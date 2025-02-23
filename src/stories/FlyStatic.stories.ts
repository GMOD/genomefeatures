import { createExampleAndSvgElementStatic } from './util'
import { TRACK_TYPE } from '../tracks/TrackTypeEnum'

import type { Meta, StoryObj } from '@storybook/html'

export default {
  title: 'Fly example (static file fetching)',
  // @ts-expect-error
  render: args => createExampleAndSvgElementStatic(args),
} satisfies Meta

export const Fly1: StoryObj = {
  args: {
    locString: '2L:130639..135911',
    genome: 'fly',
    divId: 'mysvg',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
  },
}

export const Fly2: StoryObj = {
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    divId: 'viewerFlyExample3',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    showLabels: true,
    variantFilter: ['NT_033778.4:g.23975146T>C'],
  },
}

export const Fly3: StoryObj = {
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    divId: 'viewerFlyExample2',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    showLabels: true,
  },
}

export const Fly4: StoryObj = {
  args: {
    locString: '2L:130639..135911',
    genome: 'fly',
    divId: 'viewerFlyExample1NoLabel',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    showLabels: false,
  },
}

export const Fly5: StoryObj = {
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    divId: 'viewerFlyExample3NoLabel',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    showLabels: false,
    variantFilter: ['NT_033778.4:g.23975146T>C'],
  },
}

export const Fly6: StoryObj = {
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    divId: 'viewerFlyExample2NoLabel',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    showLabels: false,
  },
}

export const Fly7: StoryObj = {
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    divId: 'viewerFlyExample2NoLabelAnd',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    showLabels: false,
  },
}

export const Fly8: StoryObj = {
  args: {
    locString: '3R:22693140..22699809',
    genome: 'fly',
    divId: 'viewerFlyExample3',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    showLabels: false,
  },
}

export const Fly9: StoryObj = {
  args: {
    locString: '2R:23974972..23989001',
    genome: 'fly',
    divId: 'viewerFlyExample4',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    showLabels: false,
  },
}

export const Fly10: StoryObj = {
  args: {
    locString: '3R:22693140..22699809',
    genome: 'fly',
    divId: 'viewerFlyExample5',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    showLabels: false,
    variantFilter: ['FB:FBal0265700', 'FB:FBal0265699'],
  },
}

export const Fly11: StoryObj = {
  args: {
    locString: '2R:18614210..18615018',
    genome: 'fly',
    divId: 'viewerFlyExample6',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    showLabels: false,
    variantFilter: ['FB:FBal0325512'],
  },
}

export const Fly12: StoryObj = {
  args: {
    locString: 'X:2023822..2043557',
    genome: 'fly',
    divId: 'viewerFlyExample7',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    showLabels: false,
    variantFilter: ['FB:FBal0212726'],
  },
}
