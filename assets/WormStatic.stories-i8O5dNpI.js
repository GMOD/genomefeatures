import{c as i}from"./util-nd0FhTjR.js";import{T as a}from"./genomefeatures-F4qUAmys.js";const p={title:"Worm example",render:m=>i(m)},c=globalThis.LOCAL_DATA_SERVER??(typeof window<"u"?window.location.origin:""),t=`${c}/s3.amazonaws.com/agrjbrowse/VCF/7.0.0/worm-latest.vcf.gz`,n=`${c}/s3.amazonaws.com/agrjbrowse/docker/7.0.0/WormBase/c_elegans_PRJNA13758/tracks/All_Genes/{refseq}/trackData.jsonz`,r={args:{locString:"V:7106..57424",genome:"worm",type:a.ISOFORM_EMBEDDED_VARIANT,vcfTabixUrl:t,ncListUrlTemplate:n}},e={args:{locString:"V:7106..57424",genome:"worm",type:a.ISOFORM_EMBEDDED_VARIANT,vcfTabixUrl:t,ncListUrlTemplate:n}},o={args:{locString:"V:7114..57432",genome:"worm",type:a.ISOFORM_EMBEDDED_VARIANT,vcfTabixUrl:t,ncListUrlTemplate:n}},s={args:{locString:"V:7114..57432",genome:"worm",type:a.ISOFORM_AND_VARIANT,vcfTabixUrl:t,ncListUrlTemplate:n}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    locString: 'V:7114..57432',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    vcfTabixUrl,
    ncListUrlTemplate
  } satisfies StaticArgs
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    locString: 'V:7114..57432',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    vcfTabixUrl,
    ncListUrlTemplate
  } satisfies StaticArgs
}`,...s.parameters?.docs?.source}}};const A=["Worm1","Worm2","Worm3","Worm4"];export{r as Worm1,e as Worm2,o as Worm3,s as Worm4,A as __namedExportsOrder,p as default};
