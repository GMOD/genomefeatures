import{c as i}from"./util-W8dZd2pp.js";import{T as s}from"./genomefeatures-DsVbPNrU.js";const l={title:"Rat example (static files)",render:c=>i(c)},n="https://s3.amazonaws.com/agrjbrowse/docker/7.0.0/RGD/rat/tracks/All_Genes/{refseq}/trackData.jsonz",o="https://s3.amazonaws.com/agrjbrowse/docker/7.0.0/RGD/rat/tracks/All_Genes/{refseq}/trackData.jsonz",r={args:{locString:"10:94485648..94489071",genome:"rat",type:s.ISOFORM_EMBEDDED_VARIANT,ncListUrlTemplate:n,vcfTabixUrl:o}},a={args:{locString:"10:94485648..94489071",genome:"rat",type:s.ISOFORM_AND_VARIANT,ncListUrlTemplate:n,vcfTabixUrl:o}},e={args:{locString:"1:34987290..35280466",genome:"rat",type:s.ISOFORM_EMBEDDED_VARIANT,ncListUrlTemplate:n,vcfTabixUrl:o}},t={args:{locString:"1:34987290..35280466",genome:"rat",type:s.ISOFORM_EMBEDDED_VARIANT,ncListUrlTemplate:n,vcfTabixUrl:o}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '10:94485648..94489071',
    genome: 'rat',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '10:94485648..94489071',
    genome: 'rat',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...a.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '1:34987290..35280466',
    genome: 'rat',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '1:34987290..35280466',
    genome: 'rat',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...t.parameters?.docs?.source}}};const g=["Rat1","Rat2","Rat3","Rat4"];export{r as Rat1,a as Rat2,e as Rat3,t as Rat4,g as __namedExportsOrder,l as default};
