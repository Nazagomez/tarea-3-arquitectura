import { BOOKS_PAGE_SIZE } from './book-constants'

export type PaginationResult = {
  readonly page: number
  readonly pageCount: number
  readonly skip: number
  readonly limit: number
}

/**
 * Returns pagination values for a list of the given size.
 */
export function createPagination(totalItems: number, requestedPage: number): PaginationResult {
  const pageCount = Math.max(1, Math.ceil(totalItems / BOOKS_PAGE_SIZE))
  const page = Math.min(Math.max(requestedPage, 1), pageCount)
  const skip = (page - 1) * BOOKS_PAGE_SIZE
  return {
    page,
    pageCount,
    skip,
    limit: BOOKS_PAGE_SIZE
  }
}

/**
 * Returns a page number from a route query value.
 */
export function parsePageQuery(value: unknown): number {
  const rawValue = Array.isArray(value) ? value[0] : value
  const page = Number(rawValue)
  if (!Number.isInteger(page) || page < 1) {
    return 1
  }
  return page
}
