import{a as Z,T as e}from"./util-B_uc3fBR.js";import"./_commonjsHelpers-CqkleIqs.js";const re={title:"Fly example (static files)",render:W=>Z(W)},r="https://s3.amazonaws.com/agrjbrowse/VCF/7.0.0/fly-latest.vcf.gz",a="https://s3.amazonaws.com/agrjbrowse/docker/7.0.0/FlyBase/fruitfly/tracks/All_Genes/{refseq}/trackData.jsonz",s={args:{locString:"2L:130639..135911",genome:"fly",type:e.ISOFORM_EMBEDDED_VARIANT,ncListUrlTemplate:a,vcfTabixUrl:r}},t={args:{locString:"2R:23974973..23989002",genome:"fly",type:e.ISOFORM_EMBEDDED_VARIANT,variantFilter:["NT_033778.4:g.23975146T>C"],ncListUrlTemplate:a,vcfTabixUrl:r}},n={args:{locString:"2R:23974973..23989002",genome:"fly",type:e.ISOFORM_EMBEDDED_VARIANT,ncListUrlTemplate:a,vcfTabixUrl:r}},o={args:{locString:"2L:130639..135911",genome:"fly",type:e.ISOFORM_EMBEDDED_VARIANT,ncListUrlTemplate:a,vcfTabixUrl:r}},c={args:{locString:"2R:23974973..23989002",genome:"fly",type:e.ISOFORM_EMBEDDED_VARIANT,variantFilter:["NT_033778.4:g.23975146T>C"],ncListUrlTemplate:a,vcfTabixUrl:r}},l={args:{locString:"2R:23974973..23989002",genome:"fly",type:e.ISOFORM_EMBEDDED_VARIANT,ncListUrlTemplate:a,vcfTabixUrl:r}},i={args:{locString:"2R:23974973..23989002",genome:"fly",type:e.ISOFORM_AND_VARIANT,ncListUrlTemplate:a,vcfTabixUrl:r}},g={args:{locString:"3R:22693140..22699809",genome:"fly",type:e.ISOFORM_AND_VARIANT,ncListUrlTemplate:a,vcfTabixUrl:r}},m={args:{locString:"2R:23974972..23989001",genome:"fly",type:e.ISOFORM_AND_VARIANT,ncListUrlTemplate:a,vcfTabixUrl:r}},p={args:{locString:"3R:22693140..22699809",genome:"fly",type:e.ISOFORM_AND_VARIANT,variantFilter:["FB:FBal0265700","FB:FBal0265699"],ncListUrlTemplate:a,vcfTabixUrl:r}},A={args:{locString:"2R:18614210..18615018",genome:"fly",type:e.ISOFORM_AND_VARIANT,variantFilter:["FB:FBal0325512"],ncListUrlTemplate:a,vcfTabixUrl:r}},T={args:{locString:"X:2023822..2043557",genome:"fly",type:e.ISOFORM_AND_VARIANT,variantFilter:["FB:FBal0212726"],ncListUrlTemplate:a,vcfTabixUrl:r}};var R,F,y;s.parameters={...s.parameters,docs:{...(R=s.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    locString: '2L:130639..135911',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...(y=(F=s.parameters)==null?void 0:F.docs)==null?void 0:y.source}}};var S,_,f;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    variantFilter: ['NT_033778.4:g.23975146T>C'],
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...(f=(_=t.parameters)==null?void 0:_.docs)==null?void 0:f.source}}};var E,D,O;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...(O=(D=n.parameters)==null?void 0:D.docs)==null?void 0:O.source}}};var I,d,N;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    locString: '2L:130639..135911',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...(N=(d=o.parameters)==null?void 0:d.docs)==null?void 0:N.source}}};var u,M,B;c.parameters={...c.parameters,docs:{...(u=c.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    variantFilter: ['NT_033778.4:g.23975146T>C'],
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...(B=(M=c.parameters)==null?void 0:M.docs)==null?void 0:B.source}}};var U,V,v;l.parameters={...l.parameters,docs:{...(U=l.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_EMBEDDED_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...(v=(V=l.parameters)==null?void 0:V.docs)==null?void 0:v.source}}};var C,x,L;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    locString: '2R:23974973..23989002',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...(L=(x=i.parameters)==null?void 0:x.docs)==null?void 0:L.source}}};var b,K,P;g.parameters={...g.parameters,docs:{...(b=g.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    locString: '3R:22693140..22699809',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...(P=(K=g.parameters)==null?void 0:K.docs)==null?void 0:P.source}}};var Y,w,z;m.parameters={...m.parameters,docs:{...(Y=m.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    locString: '2R:23974972..23989001',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...(z=(w=m.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var j,k,h;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    locString: '3R:22693140..22699809',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    variantFilter: ['FB:FBal0265700', 'FB:FBal0265699'],
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...(h=(k=p.parameters)==null?void 0:k.docs)==null?void 0:h.source}}};var X,q,G;A.parameters={...A.parameters,docs:{...(X=A.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    locString: '2R:18614210..18615018',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    variantFilter: ['FB:FBal0325512'],
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...(G=(q=A.parameters)==null?void 0:q.docs)==null?void 0:G.source}}};var H,J,Q;T.parameters={...T.parameters,docs:{...(H=T.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    locString: 'X:2023822..2043557',
    genome: 'fly',
    type: TRACK_TYPE.ISOFORM_AND_VARIANT,
    variantFilter: ['FB:FBal0212726'],
    ncListUrlTemplate,
    vcfTabixUrl
  } satisfies StaticArgs
}`,...(Q=(J=T.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};const ae=["Fly1","Fly2","Fly3","Fly4","Fly5","Fly6","Fly7","Fly8","Fly9","Fly10","Fly11","Fly12"];export{s as Fly1,p as Fly10,A as Fly11,T as Fly12,t as Fly2,n as Fly3,o as Fly4,c as Fly5,l as Fly6,i as Fly7,g as Fly8,m as Fly9,ae as __namedExportsOrder,re as default};
