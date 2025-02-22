/**
 * Abstract feature object
 */
export interface Feature {
  /**
   * Get a piece of data about the feature.  All features must have
   * 'start' and 'end', but everything else is optional.
   */
  get(name: 'refName'): string
  get(name: 'start' | 'end'): number
  get(name: 'subfeatures'): Feature[] | undefined

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(name: string): any
  /**
   * Get the unique ID of this feature.
   */
  id(): string

  /**
   * Get this feature's parent feature, or undefined if none.
   */
  parent(): Feature | undefined

  /**
   * Get an array of child features, or undefined if none.
   */
  children(): Feature[] | undefined

  /**
   * Convert to JSON
   */
  toJSON(): SimpleFeatureSerialized
}

// subfeatures do not have to have uniqueId
export interface SimpleFeatureSerializedNoId {
  [key: string]: unknown
  parentId?: string
  fmin: number
  fmax: number
  seqId: string
  type?: string
  children?: SimpleFeatureSerializedNoId[]
}

// base serialized feature has to have a uniqueId
export interface SimpleFeatureSerialized extends SimpleFeatureSerializedNoId {
  uniqueId: string
}
