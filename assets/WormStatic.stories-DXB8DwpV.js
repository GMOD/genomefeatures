import{c as m}from"./util-W8dZd2pp.js";import{T as o}from"./genomefeatures-DsVbPNrU.js";const g={title:"Worm example (static files)",render:c=>m(c)},t="https://s3.amazonaws.com/agrjbrowse/VCF/7.0.0/worm-latest.vcf.gz",n="https://s3.amazonaws.com/agrjbrowse/docker/7.0.0/WormBase/c_elegans_PRJNA13758/tracks/All_Genes/{refseq}/trackData.jsonz",r={args:{locString:"V:7106..57424",genome:"worm",type:o.ISOFORM_EMBEDDED_VARIANT,vcfTabixUrl:t,ncListUrlTemplate:n}},e={args:{locString:"V:7106..57424",genome:"worm",type:o.ISOFORM_EMBEDDED_VARIANT,vcfTabixUrl:t,ncListUrlTemplate:n}},s={args:{locString:"V:7114..57432",genome:"worm",type:o.ISOFORM_EMBEDDED_VARIANT,vcfTabixUrl:t,ncListUrlTemplate:n}},a={args:{locString:"V:7114..57432",genome:"worm",type:o.ISOFORM_AND_VARIANT,vcfTabixUrl:t,ncListUrlTemplate:n}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    locString: 'V:7106..57424',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    vcfTabixUrl,
    ncListUrlTemplate
  } satisfies StaticArgs
}`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    locString: 'V:7106..57424',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    vcfTabixUrl,
    ncListUrlTemplate
  } satisfies StaticArgs
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    locString: 'V:7114..57432',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    vcfTabixUrl,
    ncListUrlTemplate
  } satisfies StaticArgs
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    locString: 'V:7114..57432',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    vcfTabixUrl,
    ncListUrlTemplate
  } satisfies StaticArgs
}`,...a.parameters?.docs?.source}}};const l=["Worm1","Worm2","Worm3","Worm4"];export{r as Worm1,e as Worm2,s as Worm3,a as Worm4,l as __namedExportsOrder,g as default};
