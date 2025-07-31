### Legacy access pattern - Apollo REST API

The original implementation of this component required fetching data from an
Apollo REST API endpoint. This is still supported, though it is a overkill for
most usages

```typescript
import {
  fetchApolloAPIData,
  parseLocString,
  GenomeFeatureViewer,
} from 'genomefeatures'

// if your bundler let's you import CSS, you can do this, otherwise see CDN usage example
import 'genomefeatures/style.css'

const BASE_URL = 'https://www.alliancegenome.org/apollo'
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
        type: 'ISOFORM_EMBEDDED_VARIANT',
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

And then in your HTML

```html
<svg id="svgelement"></svg>
```
