# GenomeFeatureComponent

[![npm package][npm-badge]][npm]

[![Build Status](https://img.shields.io/github/actions/workflow/status/GMOD/GenomeFeatureComponent/push.yml?branch=development)](https://github.com/GMOD/GenomeFeatureComponent/actions?query=branch%3Adevelopment+workflow%3APush+)

[npm-badge]:
  https://img.shields.io/npm/v/genomefeaturecomponent.png?style=flat-square
[npm]: https://www.npmjs.com/package/genomefeaturecomponent

# Instructions

```bash
// clone repo, then
yarn
yarn dev // http://localhost:5173
```

Works by accessing data from an [Apollo server](https://github.com/gmod/apollo).

E.g.,
http://someserver.org/apollo/track/Honeybee/Official%20Gene%20Set%20v3.2/Group1.1/GB42168-RA.json

```
[{"strand":1,"children":[[{"phase":0,"strand":1,"fmin":329332,"type":"CDS","fmax":329459},{"phase":2,"strand":1,"fmin":329849,"type":"CDS","fmax":330082},{"phase":0,"strand":1,"fmin":330165,"type":"CDS","fmax":330301},{"phase":2,"strand":1,"fmin":330375,"type":"CDS","fmax":330416},{"strand":1,"fmin":329332,"type":"exon","fmax":329459},{"strand":1,"fmin":329849,"type":"exon","fmax":330082},{"strand":1,"fmin":330165,"type":"exon","fmax":330301},{"strand":1,"fmin":330375,"type":"exon","fmax":330416}]],"name":"GB42168-RA","id":"http://demo.genomearchitect.org/Apollo2/track/Honeybee/Official Gene Set v3.2/Group1.1/GB42168-RA.json","fmin":329332,"type":"mRNA","fmax":330416,"selected":true}]
```

# Example Usage

From an example ReactJS environment (also working in VueJS and demo is in
VanillaJS). Height is calculated on the fly for 'global' isoform tracks.

```
    let transcriptTypes = getTranscriptTypes();
    const configGlobal = {
      'locale': 'global',
      'chromosome': chromosome,
      'start': fmin,
      'end': fmax,
      'transcriptTypes':transcriptTypes,
      'tracks': [
        {
          'id': 1,
          'genome': this.props.species,
          'type': 'ISOFORM',
          'url': [
            this.trackDataUrl,
            '/All%20Genes/',
            `.json${nameSuffixString}`
          ]
        },
      ]
    };
    new GenomeFeatureViewer(configGlobal, 'genome-feature', 900, undefined);
```

```
<div id='genome-feature'></div>
```

Result:

![Example 1](images/ExampleIsoform1.png)
