# genomefeatures

[![npm package][npm-badge]][npm]

[![Build Status](https://img.shields.io/github/actions/workflow/status/GMOD/genomefeatures/push.yml?branch=development)](https://github.com/GMOD/genomefeatures/actions?query=branch%3Adevelopment+workflow%3APush+)

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

## Loading data

### Apollo REST API

The original component accessed data via an Apollo REST API

This is still supported, though it is a overkill for most usages

```typescript
let transcriptTypes = getTranscriptTypes()
const configGlobal = {
  locale: 'global',
  chromosome: chromosome,
  start: fmin,
  end: fmax,
  transcriptTypes: transcriptTypes,
  tracks: [
    {
      id: 1,
      genome: this.props.species,
      type: 'ISOFORM',
      url: [this.trackDataUrl, '/All%20Genes/', `.json${nameSuffixString}`],
    },
  ],
}
new GenomeFeatureViewer(configGlobal, 'genome-feature', 900, undefined)
```

```html
<div id="genome-feature"></div>
```

### Accessing JBrowse NCList files via @gmod/nclist

Uses a "baseUrl" and "urlTemplate" similar to JBrowse 1 configs

```typescript
new GenomeFeatureViewer(
  {
    locale: 'global',
    chromosome: chromosome,
    start: start,
    end: end,
    transcriptTypes: getTranscriptTypes(),
    showVariantLabel: showLabel,
    variantFilter: variantFilter || [],
    service: new NCListService(),
    tracks: [
      {
        id: 12,
        genome: genome,
        type: type,
        url: {
          baseUrl: `https://s3.amazonaws.com/agrjbrowse/docker/3.2.0/SARS-CoV-2/tracks/`,
          urlTemplate: 'All%20Genes/NC_045512.2/trackData.jsonz',
        },
      },
    ],
  },
  `#genome-feature`,
  900,
  500,
)
```

```html
<div id="genome-feature"></div>
```

## Notes

Can be run in ReactJS, VueJS, VanillaJS. Height is calculated on the fly for
'global' isoform tracks.

```

```
