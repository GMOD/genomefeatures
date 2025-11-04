import{c as o}from"./util-nd0FhTjR.js";import{T as t}from"./genomefeatures-F4qUAmys.js";const i={title:"COVID example",render:r=>o(r)},s=globalThis.LOCAL_DATA_SERVER??(typeof window<"u"?window.location.origin:""),a=`${s}/s3.amazonaws.com/agrjbrowse/docker/3.2.0/SARS-CoV-2/tracks/All Genes/{refseq}/trackData.jsonz`,e={args:{locString:"NC_045512.2:17894..28259",genome:"SARS-CoV-2",type:t.ISOFORM,ncListUrlTemplate:a}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    locString: 'NC_045512.2:17894..28259',
    genome: 'SARS-CoV-2',
    type: TRACK_TYPE.ISOFORM,
    ncListUrlTemplate
  } satisfies StaticArgs
}`,...e.parameters?.docs?.source}}};const l=["Simple"];export{e as Simple,l as __namedExportsOrder,i as default};
