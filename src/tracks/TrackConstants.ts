// Feature type constants used across track rendering
export const FEATURE_TYPES = {
  UTR: ['UTR', 'five_prime_UTR', 'three_prime_UTR'],
  CDS: ['CDS'],
  EXON: ['exon'],
} as const

// Sort weights for feature rendering priority
export const FEATURE_SORT_WEIGHTS: Record<string, number> = {
  // Exons render first (lowest z-index)
  exon: 100,

  // UTRs render next
  UTR: 200,
  five_prime_UTR: 200,
  three_prime_UTR: 200,

  // CDS renders on top (highest z-index)
  CDS: 1000,
}

/**
 * Creates a sort weight map from feature type arrays
 * @param utrFeats - Array of UTR feature types
 * @param cdsFeats - Array of CDS feature types
 * @param exonFeats - Array of exon feature types
 * @returns Record mapping feature types to sort weights
 */
export function createSortWeightMap(
  utrFeats: string[],
  cdsFeats: string[],
  exonFeats: string[],
): Record<string, number> {
  const sortWeight: Record<string, number> = {}

  exonFeats.forEach(feat => {
    sortWeight[feat] = 100
  })

  utrFeats.forEach(feat => {
    sortWeight[feat] = 200
  })

  cdsFeats.forEach(feat => {
    sortWeight[feat] = 1000
  })

  return sortWeight
}

/**
 * Generates SVG polygon points string for directional arrows
 * @param height - Height of the arrow
 * @param width - Width of the arrow
 * @returns SVG polygon points string in format "x1,y1 x2,y2 x3,y3"
 */
export function generateArrowPoints(height: number, width: number): string {
  return `0,0 0,${height} ${width},${width}`
}

/**
 * Sorts isoform data, prioritizing selected items and then by name
 * @param data - Array of isoform data to sort
 * @returns Sorted array with selected items first, then alphabetically by name
 */
export function sortIsoformData<T extends { selected?: boolean; name: string }>(
  data: T[],
): T[] {
  return data.sort((a, b) => {
    if (a.selected && !b.selected) {
      return -1
    }
    if (!a.selected && b.selected) {
      return 1
    }
    return a.name.localeCompare(b.name)
  })
}

/**
 * Gets the width of a label's bounding box, with fallback for environments where getBBox fails
 * @param label - D3 selection of the label element
 * @param fallbackWidth - Width to use if getBBox fails (default: 100)
 * @returns Width of the label in pixels
 */
export function getLabelWidth(
  label: { node: () => { getBBox: () => { width: number } } | null },
  fallbackWidth = 100,
): number {
  try {
    return label.node()?.getBBox().width ?? fallbackWidth
  } catch (e) {
    console.debug('Could not get bounding box for label, using fallback width')
    return fallbackWidth
  }
}

/**
 * Adjusts label position if it would overflow the viewer width
 * @param labelOffset - Current label offset position
 * @param labelWidth - Width of the label
 * @param viewerWidth - Width of the viewer container
 * @returns Adjusted label offset that keeps label within bounds
 */
export function adjustLabelPosition(
  labelOffset: number,
  labelWidth: number,
  viewerWidth: number,
): number {
  if (labelWidth + labelOffset > viewerWidth) {
    return labelOffset - (labelWidth + labelOffset - viewerWidth)
  }
  return labelOffset
}
