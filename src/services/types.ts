// subfeatures do not have to have uniqueId
export interface SimpleFeatureSerializedNoId {
  parentId?: string
  fmin: number
  fmax: number
  seqId: string
  type: string
  name: string
  children?: SimpleFeatureSerializedNoId[]
  alleles?: string[]
  selected?: string
  strand: number
}

// base serialized feature has to have a uniqueId
export interface SimpleFeatureSerialized extends SimpleFeatureSerializedNoId {
  uniqueId: string
}
