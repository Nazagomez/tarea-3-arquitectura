export type CometEntry<TData> = {
  readonly id: string
  readonly slug: string
  readonly title: string
  readonly status: string
  readonly data: TData
}

export type CometListMeta = {
  readonly total?: number
  readonly limit?: number
  readonly offset?: number
}

export type CometListResponse<TData> = {
  readonly data: CometEntry<TData>[]
  readonly meta?: CometListMeta
}

export type CometEntryResponse<TData> = {
  readonly data: CometEntry<TData>
}
