/**
 * Returns a rating with two decimal places.
 */
export function formatBookRating(rating: number): string {
  return rating.toFixed(2)
}

/**
 * Returns a compact integer for counts and scores.
 */
export function formatBookCount(value: number): string {
  return new Intl.NumberFormat('es-CR').format(value)
}

/**
 * Returns a readable year or a fallback when the value is missing.
 */
export function formatPublishYear(year: number): string {
  if (!year) {
    return 'Año no disponible'
  }
  return String(year)
}

/**
 * Returns a price label or a fallback when the dataset has no value.
 */
export function formatBookPrice(price: string): string {
  if (!price || price === '0') {
    return 'Precio no disponible'
  }
  return `$${price}`
}
