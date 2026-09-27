type RelationLike = {
  readonly id?: string
  readonly slug?: string
  readonly title?: string
  readonly data?: {
    readonly nombre?: string
    readonly familia?: RelationLike | string
  }
}

/**
 * Reads the identifier stored in a Comet relation field.
 */
export function readRelationId(value: unknown): string {
  if (typeof value === 'string') {
    return value
  }
  if (value && typeof value === 'object' && 'id' in value) {
    return String((value as RelationLike).id ?? '')
  }
  return ''
}

/**
 * Reads the slug stored in a Comet relation field.
 */
export function readRelationSlug(value: unknown): string {
  if (value && typeof value === 'object' && 'slug' in value) {
    return String((value as RelationLike).slug ?? '')
  }
  if (typeof value === 'string') {
    return value
  }
  return ''
}

/**
 * Reads the public name stored in a Comet relation field.
 */
export function readRelationName(value: unknown): string {
  if (value && typeof value === 'object') {
    const relation = value as RelationLike
    return relation.data?.nombre ?? relation.title ?? ''
  }
  if (typeof value === 'string') {
    return value
  }
  return ''
}

/**
 * Reads the parent family slug when a genre relation is expanded.
 */
export function readNestedFamilySlug(value: unknown): string {
  if (!value || typeof value !== 'object') {
    return ''
  }
  const familia = (value as RelationLike).data?.familia
  return readRelationSlug(familia)
}

/**
 * Reads the parent family name when a genre relation is expanded.
 */
export function readNestedFamilyName(value: unknown): string {
  if (!value || typeof value !== 'object') {
    return ''
  }
  const familia = (value as RelationLike).data?.familia
  return readRelationName(familia)
}
