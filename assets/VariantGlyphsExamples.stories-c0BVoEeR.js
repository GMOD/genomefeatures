import{f as y,a as k,G as v}from"./genomefeatures-DsVbPNrU.js";function b(r){const e=document.createElement("div");e.style.marginTop="20px";const t=document.createElement("div");t.className="viewer-border";const s=document.createElementNS("http://www.w3.org/2000/svg","svg");s.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),s.id=r,t.append(s),e.append(t);const a=document.createElement("div");return a.innerHTML="Loading data from S3...",a.style.padding="10px",e.prepend(a),{container:e,loading:a}}async function x({chromosome:r="19",start:e=32735e3,end:t=328e5,organism:s="mouse",geneSymbol:a="PTEN",releaseVersion:i="8.2.0",s3DockerBucketUrl:g="https://s3.amazonaws.com/agrjbrowse/docker",s3VcfBucketUrl:h="https://s3.amazonaws.com/agrjbrowse/VCF"}){const{container:u,loading:n}=b(`${s}-${a}-svg`);try{const o={chromosome:r,start:e,end:t};let d,m,p;s==="mouse"?(d=`${g}/${i}/MGI/mouse/tracks/All_Genes/${r}/trackData.jsonz`,m=`${h}/${i}/mouse-latest.vcf.gz`,p="mouse"):(d=`${g}/${i}/FlyBase/fruitfly/tracks/All_Genes/${r}/trackData.jsonz`,m=`${h}/${i}/fly-latest.vcf.gz`,p="fly");const w=await y({region:o,urlTemplate:d}),f=await k({url:m,region:o});n.innerHTML=`Loaded ${f.length} variants`,setTimeout(()=>{new v({region:o,genome:p,tracks:[{type:"ISOFORM_EMBEDDED_VARIANT",trackData:w,variantData:f}],showVariantLabel:!1,variantFilter:[],isoformFilter:[],binRatio:.01},`#${s}-${a}-svg`,900,500),setTimeout(()=>{n.innerHTML=`✓ Loaded ${f.length} variants for ${a} gene`,n.style.color="green"},500)},100)}catch(o){n.innerHTML=`Error loading data: ${o}`,n.style.color="red",console.error("Failed to load data:",o)}return u}const S={title:"VCF Variant Glyphs Fix",render:r=>{const e=document.createElement("div");return x(r).then(t=>{e.append(t)}).catch(t=>{e.innerHTML=`<div style="color: red; padding: 20px;">Error: ${t}</div>`}),e},parameters:{docs:{description:{component:`
# VCF Variant Glyphs Fix - KANBAN-757

This demonstrates the fixes for variant glyph rendering after the Apollo to JBrowse migration.

## What This Shows
- **Real S3 Data**: Fetches actual VCF and NCList data from Alliance S3 buckets
- **Variant Glyphs**: Diamond-shaped glyphs that were completely missing before our fixes
- **Correct Colors**: Consequence-based coloring (yellow for missense, red for high impact)
- **PTEN Gene**: Mouse chromosome 19, positions 32735000-32800000

## The Fixes We Made
1. **Consequence Value Processing**: Strip brackets from values like "[missense_variant]"
2. **Allele ID Parsing**: Handle JSON-wrapped IDs like '["MGI:123"]'
3. **Performance**: Pre-compute variant bins for faster rendering

## How It Works
This story uses the same data pipeline as production:
- NCList data from: \`agrjbrowse/docker/8.2.0/MGI/mouse/tracks/All_Genes/19/trackData.jsonz\`
- VCF data from: \`agrjbrowse/VCF/8.2.0/mouse-latest.vcf.gz\`
        `}}},argTypes:{chromosome:{control:{type:"text"},description:"Chromosome to display"},start:{control:{type:"number"},description:"Start position"},end:{control:{type:"number"},description:"End position"},releaseVersion:{control:{type:"text"},description:"Alliance data release version (e.g., 8.2.0)"},s3DockerBucketUrl:{control:{type:"text"},description:"S3 bucket URL for docker/tracks data"},s3VcfBucketUrl:{control:{type:"text"},description:"S3 bucket URL for VCF files"}}},c={args:{chromosome:"19",start:32735e3,end:328e5,organism:"mouse",geneSymbol:"PTEN",releaseVersion:"8.2.0",s3DockerBucketUrl:"https://s3.amazonaws.com/agrjbrowse/docker",s3VcfBucketUrl:"https://s3.amazonaws.com/agrjbrowse/VCF"},parameters:{docs:{description:{story:`
**Mouse PTEN Gene (MGI:109583)**

This loads real variant data from the Alliance S3 bucket for the PTEN gene region.

Expected variants include:
- Missense variants (yellow/gold diamonds)
- Start lost variants (red diamonds)
- UTR variants (modifier impact)

The data is fetched using tabix for efficient region-specific loading.
        `}}}},l={args:{chromosome:"2R",start:23978801,end:23985177,organism:"fly",geneSymbol:"Sox14",releaseVersion:"8.2.0",s3DockerBucketUrl:"https://s3.amazonaws.com/agrjbrowse/docker",s3VcfBucketUrl:"https://s3.amazonaws.com/agrjbrowse/VCF"},parameters:{docs:{description:{story:`
**Fly Sox14 Gene (FBgn0005612)**

This loads real variant data from the Alliance S3 bucket for the Sox14 gene region in Drosophila.

Sox14 is located on chromosome 2R:23978801-23985177 (6.38 kb) and this demonstrates that our fixes work across different species.

The data is fetched from:
- NCList: FlyBase/fruitfly/tracks/All_Genes/2R/trackData.jsonz  
- VCF: fly-latest.vcf.gz
        `}}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    chromosome: '19',
    start: 32735000,
    end: 32800000,
    organism: 'mouse',
    geneSymbol: 'PTEN',
    releaseVersion: '8.2.0',
    s3DockerBucketUrl: 'https://s3.amazonaws.com/agrjbrowse/docker',
    s3VcfBucketUrl: 'https://s3.amazonaws.com/agrjbrowse/VCF'
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Mouse PTEN Gene (MGI:109583)**

This loads real variant data from the Alliance S3 bucket for the PTEN gene region.

Expected variants include:
- Missense variants (yellow/gold diamonds)
- Start lost variants (red diamonds)
- UTR variants (modifier impact)

The data is fetched using tabix for efficient region-specific loading.
        \`
      }
    }
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    chromosome: '2R',
    start: 23978801,
    end: 23985177,
    organism: 'fly',
    geneSymbol: 'Sox14',
    releaseVersion: '8.2.0',
    s3DockerBucketUrl: 'https://s3.amazonaws.com/agrjbrowse/docker',
    s3VcfBucketUrl: 'https://s3.amazonaws.com/agrjbrowse/VCF'
  },
  parameters: {
    docs: {
      description: {
        story: \`
**Fly Sox14 Gene (FBgn0005612)**

This loads real variant data from the Alliance S3 bucket for the Sox14 gene region in Drosophila.

Sox14 is located on chromosome 2R:23978801-23985177 (6.38 kb) and this demonstrates that our fixes work across different species.

The data is fetched from:
- NCList: FlyBase/fruitfly/tracks/All_Genes/2R/trackData.jsonz  
- VCF: fly-latest.vcf.gz
        \`
      }
    }
  }
}`,...l.parameters?.docs?.source}}};const F=["MousePTEN","FlySox14"];export{l as FlySox14,c as MousePTEN,F as __namedExportsOrder,S as default};
