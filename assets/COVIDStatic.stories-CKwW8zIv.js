import{c as r}from"./util-W8dZd2pp.js";import{T as s}from"./genomefeatures-DsVbPNrU.js";const n={title:"COVID example (static files)",render:t=>r(t)},a="https://s3.amazonaws.com/agrjbrowse/docker/3.2.0/SARS-CoV-2/tracks/All Genes/{refseq}/trackData.jsonz",e={args:{locString:"NC_045512.2:17894..28259",genome:"SARS-CoV-2",type:s.ISOFORM,ncListUrlTemplate:a}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    locString: 'NC_045512.2:17894..28259',
    genome: 'SARS-CoV-2',
    type: TRACK_TYPE.ISOFORM,
    ncListUrlTemplate
  } satisfies StaticArgs
}`,...e.parameters?.docs?.source}}};const i=["Simple"];export{e as Simple,i as __namedExportsOrder,n as default};
