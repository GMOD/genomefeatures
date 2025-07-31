import{c as F}from"./util-W8dZd2pp.js";import{T as e}from"./genomefeatures-DsVbPNrU.js";const _={title:"Fly example (static files)",render:R=>F(R)},r="https://s3.amazonaws.com/agrjbrowse/VCF/7.0.0/fly-latest.vcf.gz",a="https://s3.amazonaws.com/agrjbrowse/docker/7.0.0/FlyBase/fruitfly/tracks/All_Genes/{refseq}/trackData.jsonz",s={args:{locString:"2L:130639..135911",genome:"fly",type:e.ISOFORM_EMBEDDED_VARIANT,ncListUrlTemplate:a,vcfTabixUrl:r}},t={args:{locString:"2R:23974973..23989002",genome:"fly",type:e.ISOFORM_EMBEDDED_VARIANT,variantFilter:["NT_033778.4:g.23975146T>C"],ncListUrlTemplate:a,vcfTabixUrl:r}},n={args:{locString:"2R:23974973..23989002",genome:"fly",type:e.ISOFORM_EMBEDDED_VARIANT,ncListUrlTemplate:a,vcfTabixUrl:r}},o={args:{locString:"2L:130639..135911",genome:"fly",type:e.ISOFORM_EMBEDDED_VARIANT,ncListUrlTemplate:a,vcfTabixUrl:r}},c={args:{locString:"2R:23974973..23989002",genome:"fly",type:e.ISOFORM_EMBEDDED_VARIANT,variantFilter:["NT_033778.4:g.23975146T>C"],ncListUrlTemplate:a,vcfTabixUrl:r}},l={args:{locString:"2R:23974973..23989002",genome:"fly",type:e.ISOFORM_EMBEDDED_VARIANT,ncListUrlTemplate:a,vcfTabixUrl:r}},i={args:{locString:"2R:23974973..23989002",genome:"fly",type:e.ISOFORM_AND_VARIANT,ncListUrlTemplate:a,vcfTabixUrl:r}},g={args:{locString:"3R:22693140..22699809",genome:"fly",type:e.ISOFORM_AND_VARIANT,ncListUrlTemplate:a,vcfTabixUrl:r}},m={args:{locString:"2R:23974972..23989001",genome:"fly",type:e.ISOFORM_AND_VARIANT,ncListUrlTemplate:a,vcfTabixUrl:r}},p={args:{locString:"3R:22693140..22699809",genome:"fly",type:e.ISOFORM_AND_VARIANT,variantFilter:["FB:FBal0265700","FB:FBal0265699"],ncListUrlTemplate:a,vcfTabixUrl:r}},A={args:{locString:"2R:18614210..18615018",genome:"fly",type:e.ISOFORM_AND_VARIANT,variantFilter:["FB:FBal0325512"],ncListUrlTemplate:a,vcfTabixUrl:r}},T={args:{locString:"X:2023822..2043557",genome:"fly",type:e.ISOFORM_AND_VARIANT,variantFilter:["FB:FBal0212726"],ncListUrlTemplate:a,vcfTabixUrl:r}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '2L:130639..135911',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    variantFilter: ['NT_033778.4:g.23975146T>C'],
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '2L:130639..135911',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    variantFilter: ['NT_033778.4:g.23975146T>C'],
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...i.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '3R:22693140..22699809',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...g.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '2R:23974972..23989001',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '3R:22693140..22699809',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    variantFilter: ['FB:FBal0265700', 'FB:FBal0265699'],
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...p.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '2R:18614210..18615018',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    variantFilter: ['FB:FBal0325512'],
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...A.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    locString: 'X:2023822..2043557',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    variantFilter: ['FB:FBal0212726'],
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...T.parameters?.docs?.source}}};const f=["Fly1","Fly2","Fly3","Fly4","Fly5","Fly6","Fly7","Fly8","Fly9","Fly10","Fly11","Fly12"];export{s as Fly1,p as Fly10,A as Fly11,T as Fly12,t as Fly2,n as Fly3,o as Fly4,c as Fly5,l as Fly6,i as Fly7,g as Fly8,m as Fly9,f as __namedExportsOrder,_ as default};
