# genomefeatures

[![npm package][npm-badge]][npm]

[![Build Status](https://img.shields.io/github/actions/workflow/status/GMOD/genomefeatures/push.yml?branch=main)](https://github.com/GMOD/genomefeatures/actions?query=branch%3Amain+workflow%3APush+)

[npm-badge]: https://img.shields.io/npm/v/genomefeatures.png?style=flat-square
[npm]: https://www.npmjs.com/package/genomefeatures

# Instructions

```bash
git clone git@github.com:GMOD/genomefeatures
yarn
yarn dev
```

# Screenshot

![Example 1](images/ExampleIsoform1.png)

## Live demo

https://gmod.org/genomefeatures/

## Loading data

### Apollo REST API

The original component accessed data via an Apollo REST API

This is still supported, though it is a overkill for most usages

```typescript
import {
  fetchApolloAPIData,
  parseLocString,
  GenomeFeatureViewer,
} from 'genomefeatures'

const locString = '2L:130639..135911'
const genome = 'fly'
const region = parseLocString(locString)
const trackData = await fetchApolloAPIFeatures({
  region,
  genome,
  track: 'All Genes',
  baseUrl: `${BASE_URL}/track/`,
})

const variantData = await fetchApolloAPIFeatures({
  region,
  genome,
  track: 'Variants',
  baseUrl: `${BASE_URL}/vcf/`,
})

const gfc = new GenomeFeatureViewer(
  {
    region,
    genome,
    tracks: [
      {
        type,
        trackData,
        variantData,
      },
    ],
  },
  `#svgelement`,
  900,
  500,
)
```

```html
<svg id="svgelement"></svg>
```

### Accessing JBrowse NCList files via @gmod/nclist

Uses a "baseUrl" and "urlTemplate" similar to JBrowse 1 configs

```typescript
import {
  fetchNCListData,
  parseLocString,
  GenomeFeatureViewer,
} from 'genomefeatures'

const locString = 'NC_045512.2:17894..28259'
const genome = 'SARS-CoV-2'
const region = parseLocString(locString)
const trackData = await fetchNCListData({
  region,
  baseUrl: `https://s3.amazonaws.com/agrjbrowse/docker/3.2.0/SARS-CoV-2/tracks/`,
  urlTemplate: 'All%20Genes/NC_045512.2/trackData.jsonz',
})

const gfc = new GenomeFeatureViewer(
  {
    region,
    genome,
    tracks: [
      {
        type,
        trackData,
      },
    ],
  },
  `#svgelement`,
  900,
  500,
)
```

```html
<svg id="svgelement"></svg>
```

## Notes

Can be run in ReactJS, VueJS, VanillaJS. Height is calculated on the fly for
'global' isoform tracks.

```

```
