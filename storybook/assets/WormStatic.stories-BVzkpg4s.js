import{a as d,T as o}from"./util-B_uc3fBR.js";import"./_commonjsHelpers-CqkleIqs.js";const I={title:"Worm example (static files)",render:D=>d(D)},t="https://s3.amazonaws.com/agrjbrowse/VCF/7.0.0/worm-latest.vcf.gz",n="https://s3.amazonaws.com/agrjbrowse/docker/7.0.0/WormBase/c_elegans_PRJNA13758/tracks/All_Genes/{refseq}/trackData.jsonz",r={args:{locString:"V:7106..57424",genome:"worm",type:o.ISOFORM_EMBEDDED_VARIANT,vcfTabixUrl:t,ncListUrlTemplate:n}},e={args:{locString:"V:7106..57424",genome:"worm",type:o.ISOFORM_EMBEDDED_VARIANT,vcfTabixUrl:t,ncListUrlTemplate:n}},s={args:{locString:"V:7114..57432",genome:"worm",type:o.ISOFORM_EMBEDDED_VARIANT,vcfTabixUrl:t,ncListUrlTemplate:n}},a={args:{locString:"V:7114..57432",genome:"worm",type:o.ISOFORM_AND_VARIANT,vcfTabixUrl:t,ncListUrlTemplate:n}};var c,m,i;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    locString: 'V:7106..57424',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    vcfTabixUrl,
    ncListUrlTemplate
  } satisfies StaticArgs
}`,...(i=(m=r.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var p,g,l;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    locString: 'V:7106..57424',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    vcfTabixUrl,
    ncListUrlTemplate
  } satisfies StaticArgs
}`,...(l=(g=e.parameters)==null?void 0:g.docs)==null?void 0:l.source}}};var A,T,_;s.parameters={...s.parameters,docs:{...(A=s.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    locString: 'V:7114..57432',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    vcfTabixUrl,
    ncListUrlTemplate
  } satisfies StaticArgs
}`,...(_=(T=s.parameters)==null?void 0:T.docs)==null?void 0:_.source}}};var S,E,R;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    locString: 'V:7114..57432',
    genome: 'worm',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    vcfTabixUrl,
    ncListUrlTemplate
  } satisfies StaticArgs
}`,...(R=(E=a.parameters)==null?void 0:E.docs)==null?void 0:R.source}}};const f=["Worm1","Worm2","Worm3","Worm4"];export{r as Worm1,e as Worm2,s as Worm3,a as Worm4,f as __namedExportsOrder,I as default};
