import type { CometEntry, CometEntryResponse, CometListResponse } from '../types/comet-entry'

type CometQuery = Record<string, string | number | undefined>

/**
 * Reads Comet CMS through the Nitro proxy so the token never reaches the browser.
 */
export function useCometApi() {
  async function executeList<TData>(collection: string, query: CometQuery = {}): Promise<CometEntry<TData>[]> {
    try {
      const response = await $fetch<CometListResponse<TData>>(`/api/comet/content/${collection}`, {
        query
      })
      return response.data ?? []
    } catch {
      return []
    }
  }
  async function executeEntry<TData>(
    collection: string,
    identifier: string,
    query: CometQuery = {}
  ): Promise<CometEntry<TData> | null> {
    try {
      const response = await $fetch<CometEntryResponse<TData>>(`/api/comet/content/${collection}/${identifier}`, {
        query
      })
      return response.data ?? null
    } catch {
      return null
    }
  }
  return {
    executeList,
    executeEntry
  }
}
