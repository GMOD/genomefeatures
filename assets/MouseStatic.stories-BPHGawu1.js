import{c as u}from"./util-nd0FhTjR.js";import{T as e}from"./genomefeatures-F4qUAmys.js";const S={title:"Mouse example",render:l=>u(l)},p=globalThis.LOCAL_DATA_SERVER??(typeof window<"u"?window.location.origin:""),s=`${p}/s3.amazonaws.com/agrjbrowse/docker/7.0.0/MGI/mouse/tracks/All_Genes/{refseq}/trackData.jsonz`,r=`${p}/s3.amazonaws.com/agrjbrowse/VCF/7.0.0/mouse-latest.vcf.gz`,o={args:{locString:"18:11035719..11058885",genome:"mouse",type:e.ISOFORM_AND_VARIANT,ncListUrlTemplate:s,vcfTabixUrl:r}},a={args:{locString:"18:11042037..11052567",genome:"mouse",type:e.ISOFORM,ncListUrlTemplate:s,vcfTabixUrl:r}},t={args:{locString:"17:46007760..46041588",genome:"mouse",type:e.ISOFORM_AND_VARIANT,ncListUrlTemplate:s,vcfTabixUrl:r}},n={args:{locString:"11:69550420..69563869",genome:"mouse",type:e.ISOFORM_AND_VARIANT,ncListUrlTemplate:s,vcfTabixUrl:r}},c={args:{locString:"3:115707662..115717830",genome:"mouse",type:e.ISOFORM_AND_VARIANT,ncListUrlTemplate:s,vcfTabixUrl:r}},i={args:{locString:"6:113619452..113636198",genome:"mouse",type:e.ISOFORM_EMBEDDED_VARIANT,ncListUrlTemplate:s,vcfTabixUrl:r}},m={args:{locString:"6:113619452..113636198",genome:"mouse",type:e.ISOFORM_EMBEDDED_VARIANT,ncListUrlTemplate:s,vcfTabixUrl:r}},g={args:{locString:"6:113619452..113636198",genome:"mouse",type:e.ISOFORM_AND_VARIANT,ncListUrlTemplate:s,vcfTabixUrl:r}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '18:11035719..11058885',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '18:11042037..11052567',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '17:46007760..46041588',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '11:69550420..69563869',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '3:115707662..115717830',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '6:113619452..113636198',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...i.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '6:113619452..113636198',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    locString: '6:113619452..113636198',
    genome: 'mouse',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...g.parameters?.docs?.source}}};const _=["Mouse1","Mouse2","Mouse3","Mouse4","Mouse5","Mouse6","Mouse7","Mouse8"];export{o as Mouse1,a as Mouse2,t as Mouse3,n as Mouse4,c as Mouse5,i as Mouse6,m as Mouse7,g as Mouse8,_ as __namedExportsOrder,S as default};
