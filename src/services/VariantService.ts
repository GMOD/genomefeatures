import { getColorForConsequence } from './ConsequenceService'
import { SimpleFeatureSerialized } from './types'

const SNV_HEIGHT = 10
const SNV_WIDTH = 10

export function generateSnvPoints(x: number) {
  return `${x},${SNV_HEIGHT} ${x + SNV_WIDTH / 2},${SNV_HEIGHT / 2} ${x},0 ${x - SNV_WIDTH / 2},${SNV_HEIGHT / 2}`
}
export function generateInsertionPoint(x: number) {
  return `${x - SNV_WIDTH / 2},${SNV_HEIGHT} ${x},0 ${x + SNV_WIDTH / 2},${SNV_HEIGHT}`
}

type Feat = SimpleFeatureSerialized & { row: number }
export function getDeletionHeight(x: Feat[], fmin: number, fmax: number) {
  if (x.length == 0) {
    return 0
  } else {
    let can_place = true
    let current_row = 0
    x.sort((a, b) => (a.row > b.row ? 1 : -1))
    x.every(feat => {
      if (current_row != feat.row && can_place) {
        return false
      } else if (current_row != feat.row) {
        current_row = feat.row
        can_place = true
      }
      if (
        (feat.fmin > fmin && feat.fmin > fmax) ||
        (feat.fmax < fmax && feat.fmax < fmin)
      ) {
        return true
      } else {
        can_place = false
        return true
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return can_place ? current_row : current_row + 1
  }
}

export function generateDelinsPoint(x: number) {
  return `${x - SNV_WIDTH / 2},${SNV_HEIGHT} ${x + SNV_WIDTH / 2},${SNV_HEIGHT} ${x - SNV_WIDTH / 2},0 ${x + SNV_WIDTH / 2},0`
}

export function getDescriptionDimensions(description: Record<string, string>) {
  const descriptionHeight = Object.keys(description).length
  const descriptionWidth = Object.entries(description)
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    .filter(d => d[1] !== undefined)
    .sort((a, b) => b[1].length - a[1].length)[0][1].length
  return {
    descriptionWidth,
    descriptionHeight,
  }
}

// we have to guard for type
function findVariantBinIndexForPosition(
  variantBins: Variant[],
  variant: VariantFeature,
  buffer: number,
) {
  const { fmax, fmin, type } = variant
  return variantBins.findIndex(fb => {
    const relativeMin = fb.fmin + buffer
    const relativeMax = fb.fmax - buffer

    // They cannot share a bin if they are different types.
    if (type !== fb.type) {
      return false
    }

    // if we overlap thAe min edge then take the minimum and whatever the maximum and add
    if (relativeMin <= fmin && relativeMax >= fmin) {
      return true
    }
    // if we overlap the max edge then take the maximum and whatever the maximum and add
    if (relativeMax <= fmax && relativeMax >= fmax) {
      return true
    }
    // if both are within the edges then just add it
    if (relativeMin >= fmin && relativeMax <= fmax) {
      return true
    }

    return false
  })
}

type VariantFeature = SimpleFeatureSerialized & Variant

// TODO: Delete, this is deprecated
interface Variant {
  fmin: number
  fmax: number
  type: string
  consequence: string
  variantSet: Variant[]
  variants: Variant[]
  allele_symbols_text?: { values: string[] }
}

export function generateVariantBins(variantData: VariantFeature[]): Variant[] {
  const variantBins: Variant[] = []
  variantData.forEach(variant => {
    const consequence = getConsequence(variant)
    const { type, fmax, fmin } = variant
    const foundVariantBinIndex = variantBins.findIndex(fb => {
      const relativeMin = fb.fmin
      const relativeMax = fb.fmax

      if (fb.type !== type) {
        return false
      }
      if (fb.consequence !== consequence) {
        return false
      }

      if (relativeMin <= fmin && relativeMax >= fmin) {
        return true
      }
      if (relativeMax <= fmax && relativeMax >= fmax) {
        return true
      }
      if (relativeMin >= fmin && relativeMax <= fmax) {
        return true
      }

      return false
    })

    if (foundVariantBinIndex !== -1) {
      const foundBin = variantBins[foundVariantBinIndex]
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      const foundMatchingVariantSetIndex = variantBins[foundVariantBinIndex]
        .variantSet
        ? variantBins[foundVariantBinIndex].variantSet.findIndex(
            b => b.type === type && b.consequence === consequence,
          )
        : -1
      if (foundMatchingVariantSetIndex >= 0) {
        variantBins[foundMatchingVariantSetIndex].variantSet.push(variant)
      } else {
        variantBins[foundVariantBinIndex].variantSet = [
          {
            variants: [variant],
            type,
            consequence,
          },
        ]
      }

      foundBin.variants.push(variant)
      foundBin.fmin = Math.min(fmin, foundBin.fmin)
      foundBin.fmax = Math.max(fmax, foundBin.fmax)
      variantBins[foundVariantBinIndex] = foundBin
    } else {
      const newBin: Variant = {
        fmin,
        fmax,
        type,
        consequence,
        variantSet: [
          {
            variants: [variant],
            type,
            consequence,
          },
        ],
        variants: [variant],
      }
      variantBins.push(newBin)
    }
  })
  return variantBins
}

export function generateVariantDataBinsAndDataSets(
  variantData: VariantFeature[],
  ratio: number,
) {
  const variantBins = [] as Variant[]
  variantData.forEach(variant => {
    const consequence = getConsequence(variant)
    const { type, fmax, fmin } = variant
    // we should ONLY ever find one or zero

    const foundVariantBinIndex = findVariantBinIndexForPosition(
      variantBins,
      variant,
      ratio,
    )

    // if a variant is found within a position bin
    // also dont bin deletions at all.
    if (foundVariantBinIndex >= 0 && type != 'deletion') {
      // add variant to this bin and adjust the min and max
      const foundBin = variantBins[foundVariantBinIndex]
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      const foundMatchingVariantSetIndex = foundBin.variantSet
        ? foundBin.variantSet.findIndex(
            b => b.type === type && b.consequence === consequence,
          )
        : -1
      // TODO:
      // if matching type and consequence, add the variant to the found variant set
      // adjust the bin min and max though
      if (foundMatchingVariantSetIndex >= 0) {
        const foundFmin = Math.min(
          foundBin.variantSet[foundMatchingVariantSetIndex].fmin,
          fmin,
        )
        const foundFmax = Math.max(
          foundBin.variantSet[foundMatchingVariantSetIndex].fmax,
          fmax,
        )
        foundBin.fmin = foundFmin
        foundBin.fmax = foundFmax
        foundBin.variantSet[foundMatchingVariantSetIndex].fmin = foundFmin
        foundBin.variantSet[foundMatchingVariantSetIndex].fmax = foundFmax
        foundBin.variantSet[foundMatchingVariantSetIndex].variants.push(variant)
      } else {
        const foundMin = Math.min(foundBin.fmin, fmin)
        const foundMax = Math.max(foundBin.fmax, fmax)

        foundBin.fmin = foundMin
        foundBin.fmax = foundMax
        foundBin.variantSet.push({
          variants: [variant],
          type,
          consequence,
          fmin,
          fmax,
        })
      }

      foundBin.variants.push(variant)
      foundBin.fmin = Math.min(fmin, foundBin.fmin)
      foundBin.fmax = Math.max(fmax, foundBin.fmax)
      variantBins[foundVariantBinIndex] = foundBin
    } else {
      const newBin = {
        fmin,
        fmax,
        type,
        consequence,
        variantSet: [
          {
            variants: [variant],
            type,
            consequence,
            fmin,
            fmax,
          },
        ],
        variants: [variant],
      }
      variantBins.push(newBin)
    }
  })
  return variantBins
}

export function renderVariantDescriptions(
  descriptions: Record<string, string>[],
) {
  if (descriptions.length === 1) {
    let stringBuffer = `<div style="margin-top: 30px;">`
    stringBuffer += renderVariantDescription(descriptions[0])
    stringBuffer += '</div>'
    return stringBuffer
  } else if (descriptions.length > 1) {
    let stringBuffer = '<ul style="list-style-type: none; margin-top: 30px;">'
    for (const d of descriptions) {
      stringBuffer += `<li style="border-bottom: solid 1px black;">${renderVariantDescription(d)}</li>`
    }
    stringBuffer += '</ul>'
    return stringBuffer
  } else {
    return 'No data available'
  }
}

export function renderVariantDescription(description: Record<string, string>) {
  const { descriptionWidth } = getDescriptionDimensions(description)
  let returnString = ''
  const location = description.location
  const [start, stop] = location.split(':')[1].split('..')
  let alt_allele = description.alternative_alleles
  let ref_allele = description.reference_allele
  let length
  if (description.type === 'SNV') {
    length = '1bp'
  } else if (description.type === 'deletion') {
    length = `${ref_allele.length - 1}bp deleted`
  } else if (description.type === 'insertion') {
    if (alt_allele === 'ALT_MISSING') {
      length = 'unknown length inserted'
      alt_allele = 'n+'
    } else {
      length = `${alt_allele.length - 1}bp inserted`
    }
  } else if (description.type === 'MNV') {
    length = `${ref_allele.length}bp`
  } else if (description.type === 'delins') {
    const del = `${ref_allele.length - 1}bp deleted`
    let ins
    if (alt_allele === 'ALT_MISSING') {
      ins = 'unknown length inserted'
      alt_allele = 'n+'
    } else {
      ins = `${alt_allele.length - 1}bp inserted`
    }
    length = `${del}; ${ins}`
  } else {
    length = `${+stop - +start}bp`
  }
  ref_allele =
    ref_allele.length > 20
      ? `${
          ref_allele.slice(0, 1).toLowerCase() +
          ref_allele.slice(1, 8).toUpperCase()
        }...${ref_allele.slice(Math.max(0, ref_allele.length - 8)).toUpperCase()}`
      : ref_allele.slice(0, 1).toLowerCase() + ref_allele.slice(1).toUpperCase()
  alt_allele =
    alt_allele.length > 20
      ? `${
          alt_allele.slice(0, 1).toLowerCase() +
          alt_allele.slice(1, 8).toUpperCase()
        }...${alt_allele.slice(Math.max(0, alt_allele.length - 8)).toUpperCase()}`
      : alt_allele.slice(0, 1).toLowerCase() + alt_allele.slice(1).toUpperCase()
  if (description.type === 'SNV' || description.type === 'MNV') {
    alt_allele = alt_allele.toUpperCase()
    ref_allele = ref_allele.toUpperCase()
  }
  let change = ''
  if (description.type === 'insertion') {
    change = `ins: ${alt_allele}`
  } else if (description.type === 'deletion') {
    change = `del: ${ref_allele}`
  } else {
    change = `${ref_allele}->${alt_allele}`
  }
  returnString += `<table class="tooltip-table"><tbody>`
  returnString += `<tr><th>Symbol</th><td>${description.symbolDetail}</td></tr>`
  returnString += `<tr><th>Type</th><td>${description.type}</td></tr>`
  returnString += `<tr><th>Consequence</th><td>${description.consequence}</td></tr>`
  if (description.impact) {
    returnString += `<tr><th>Impact</th><td>${description.impact.length > descriptionWidth ? description.impact.slice(0, Math.max(0, descriptionWidth)) : description.impact}</td></tr>`
  }
  returnString += `<tr><th>Length</th><td>${length}</td></tr>`
  if (description.name !== description.symbol) {
    returnString += `<tr><th>Name</th><td>${description.name}</td></tr>`
  }
  if (description.geneId && description.geneSymbol) {
    returnString += `<tr><th>Allele of Genes</th><td> ${description.geneSymbol.length > descriptionWidth ? description.geneSymbol.slice(0, Math.max(0, descriptionWidth)) : description.geneSymbol} (${description.geneId})</td></tr>`
  } else if (description.allele_of_genes) {
    returnString += `<tr><th>Allele of Genes</th><td>${description.allele_of_genes.length > descriptionWidth ? description.allele_of_genes.slice(0, Math.max(0, descriptionWidth)) : description.allele_of_genes}</td></tr>`
  }
  // if(description.alleles){
  //   returnString += `<tr><th>Alleles</th><td>${description.alleles.length>descriptionWidth ? description.alleles.substr(0,descriptionWidth) : description.alleles}</td></tr>`;
  // }
  if (description.alternative_alleles) {
    returnString += `<tr><th>Sequence Change</th><td>${change}</td></tr>`
    // returnString += `<tr><th>Alternative Alleles</th><td>${description.alternative_alleles.length>descriptionWidth ? description.alternative_alleles.substr(0,descriptionWidth) : description.alternative_alleles}</td></tr>`;
  }

  returnString += '</tbody></table>'
  return returnString
}

export function getVariantDescriptions(variant: Variant) {
  return variant.variants.map(v => {
    const description = getVariantDescription(v)
    description.consequence = description.consequence ?? 'UNKNOWN'
    return description
  })
}

export function getVariantAlleles(variant) {
  const returnObj = []
  variant.variants.forEach(val => {
    const allele = val.allele_ids.values[0].replace(/"/g, '')
    if (allele.split(',').length > 1) {
      allele.split(',').forEach(val2 => {
        returnObj.push(val2.replace(/\[|\]| /g, ''))
      })
    } else {
      returnObj.push(allele)
    }
  })
  return returnObj
}

export function mergeConsequenceColors() {
  return 'hotpink'
  // return colors.map( d => {
  //   return getColorForConsequence(d.consequence);
  // })
}

export function getColorsForConsequences(descriptions) {
  return descriptions.map(d => {
    return getColorForConsequence(d.consequence)
  })
}

export function getConsequence(variant) {
  let consequence = 'UNKNOWN'

  if (
    variant.geneLevelConsequence?.values &&
    variant.geneLevelConsequence.values.length > 0
  ) {
    consequence = variant.geneLevelConsequence.values[0]
      .replace(/\|/g, ' ')
      .replace(/"/g, '')
  }
  return consequence
}

/**
 * Returns an object
 * @param variant
 * @returns {object}
 */
export function getVariantDescription(variant) {
  const returnObject = {}
  returnObject.symbol = getVariantSymbol(variant)
  returnObject.symbolDetail = getVariantSymbolDetail(variant)
  returnObject.location = `${variant.seqId}:${variant.fmin}..${variant.fmax}`
  returnObject.consequence = getConsequence(variant)
  returnObject.type = variant.type
  returnObject.name = variant.name
  returnObject.description = variant.description
  returnObject.reference_allele = variant.reference_allele

  returnObject.geneId = variant.allele_of_gene_ids
    ? variant.allele_of_gene_ids.values[0].replace(/"/g, '')
    : undefined
  returnObject.geneSymbol = variant.allele_of_gene_symbols
    ? variant.allele_of_gene_symbols.values[0].replace(/"/g, '')
    : undefined

  if (variant.allele_of_genes) {
    returnObject.allele_of_genes =
      variant.allele_of_genes.values &&
      variant.allele_of_genes.values.length > 0
        ? (Array.isArray(variant.allele_of_genes.values)
            ? variant.allele_of_genes.values.join(' ')
            : variant.allele_of_genes.values
          ).replace(/"/g, '')
        : variant.allele_of_genes
  }
  if (variant.allele_ids) {
    returnObject.allele_ids =
      variant.allele_ids.values && variant.allele_ids.values.length > 0
        ? (Array.isArray(variant.allele_ids.values)
            ? variant.allele_ids.values.join(' ')
            : variant.allele_ids.values
          ).replace(/"/g, '')
        : variant.allele_ids
  }
  if (variant.alternative_alleles) {
    returnObject.alternative_alleles =
      variant.alternative_alleles.values &&
      variant.alternative_alleles.values.length > 0
        ? (Array.isArray(variant.alternative_alleles.values)
            ? variant.alternative_alleles.values.join(' ')
            : variant.alternative_alleles.values
          ).replace(/"/g, '')
        : variant.alternative_alleles
  }
  if (variant.impact) {
    returnObject.impact =
      variant.impact.values && variant.impact.values.length > 0
        ? (Array.isArray(variant.impact.values)
            ? variant.impact.values.join(' ')
            : variant.impact.values
          ).replace(/"/g, '')
        : variant.impact
  }

  return returnObject
}

export function getVariantSymbolDetail(variant) {
  if (variant.variants) {
    return variant.variants.length !== 1
      ? variant.variants.length
      : getVariantSymbolDetail(variant.variants[0])
  }
  // note that using the html version of this gets swallowed in the text svg
  if (variant.allele_symbols?.values) {
    if (variant.allele_symbols.values[0].split(',').length > 1) {
      try {
        const text_array = []
        const clean_text = variant.allele_symbols.values[0].replace(
          /"|\[|\]/g,
          '',
        )
        const clean_ids = variant.allele_ids.values[0].replace(/"|\[|\]/g, '')
        const clean_text_array = clean_text.split(',')
        const clean_id_array = clean_ids.split(',')
        for (const i in clean_text.split(',')) {
          const text = `${clean_text_array[i].trim()} (${clean_id_array[i].trim()})`
          text_array.push(text)
        }
        return text_array.join(', ')
      } catch (e) {
        console.error(e)
        return variant.allele_symbols.values[0].split(',').length
      }
    } else {
      const clean_text = variant.allele_symbols.values[0].replace(/"/g, '')
      return `${clean_text}(${variant.allele_ids.values[0].replace(
        /"|\[|\]/g,
        '',
      )})`
    }
  }
  return undefined
}

export function getVariantSymbol(variant: Variant) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (variant.variants) {
    return variant.variants.length !== 1
      ? variant.variants.length
      : getVariantSymbol(variant.variants[0])
  }
  // note that using the html version of this gets swallowed in the text svg
  if (variant.allele_symbols_text?.values) {
    return variant.allele_symbols_text.values[0].split(',').length > 1
      ? variant.allele_symbols_text.values[0].split(',').length
      : variant.allele_symbols_text.values[0].replace(/"/g, '')
  }
  return undefined
}

export function getVariantTrackPositions(variantData: VariantFeature[]) {
  const presentVariants = []
  for (const variant of variantData) {
    if (variant.type.toLowerCase() === 'deletion') {
      // Ignore deletions for now
      // presentVariants.push('deletion');
    } else if (
      variant.type.toLowerCase() === 'snv' ||
      variant.type.toLowerCase() === 'point_mutation'
    ) {
      presentVariants.push('snv')
    } else if (variant.type.toLowerCase() === 'insertion') {
      presentVariants.push('insertion')
    } else if (
      variant.type.toLowerCase() === 'delins' ||
      variant.type.toLowerCase() === 'substitution' ||
      variant.type.toLowerCase() === 'indel' ||
      variant.type.toLowerCase() === 'mnv'
    ) {
      presentVariants.push('delins')
    }
  }
  return [...new Set(presentVariants)].sort()
}
