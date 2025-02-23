import{a as d,T as s}from"./util-DfQSrmNZ.js";import"./_commonjsHelpers-CqkleIqs.js";const f={title:"Rat example (static files)",render:D=>d(D)},n="https://s3.amazonaws.com/agrjbrowse/docker/7.0.0/RGD/rat/tracks/All_Genes/{refseq}/trackData.jsonz",o="https://s3.amazonaws.com/agrjbrowse/docker/7.0.0/RGD/rat/tracks/All_Genes/{refseq}/trackData.jsonz",r={args:{locString:"10:94485648..94489071",genome:"rat",type:s.ISOFORM_EMBEDDED_VARIANT,ncListUrlTemplate:n,vcfTabixUrl:o}},a={args:{locString:"10:94485648..94489071",genome:"rat",type:s.ISOFORM_AND_VARIANT,ncListUrlTemplate:n,vcfTabixUrl:o}},e={args:{locString:"1:34987290..35280466",genome:"rat",type:s.ISOFORM_EMBEDDED_VARIANT,ncListUrlTemplate:n,vcfTabixUrl:o}},t={args:{locString:"1:34987290..35280466",genome:"rat",type:s.ISOFORM_EMBEDDED_VARIANT,ncListUrlTemplate:n,vcfTabixUrl:o}};var c,i,m;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    locString: '10:94485648..94489071',
    genome: 'rat',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...(m=(i=r.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var p,l,g;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    locString: '10:94485648..94489071',
    genome: 'rat',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...(g=(l=a.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};var R,A,T;e.parameters={...e.parameters,docs:{...(R=e.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    locString: '1:34987290..35280466',
    genome: 'rat',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...(T=(A=e.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};var S,_,E;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    locString: '1:34987290..35280466',
    genome: 'rat',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...(E=(_=t.parameters)==null?void 0:_.docs)==null?void 0:E.source}}};const M=["Rat1","Rat2","Rat3","Rat4"];export{r as Rat1,a as Rat2,e as Rat3,t as Rat4,M as __namedExportsOrder,f as default};
