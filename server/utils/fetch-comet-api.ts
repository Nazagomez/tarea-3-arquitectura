import { solveHostChallenge } from './solve-host-challenge'

type CometQuery = Record<string, unknown>
type CachedCookie = {
  readonly value: string
  readonly expiresAt: number
}

let cachedAesScript = ''
let cachedCookie: CachedCookie | null = null

function isJsonPayload(body: string): boolean {
  const trimmedBody = body.trim()
  return trimmedBody.startsWith('{') || trimmedBody.startsWith('[')
}

function createHeaders(token: string, cookie = ''): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'User-Agent': 'Mozilla/5.0'
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  if (cookie) {
    headers.Cookie = `__test=${cookie}`
  }
  return headers
}

async function executeAesScript(baseUrl: string): Promise<string> {
  if (cachedAesScript) {
    return cachedAesScript
  }
  cachedAesScript = await $fetch<string>(`${baseUrl}/aes.js`, {
    responseType: 'text',
    headers: { 'User-Agent': 'Mozilla/5.0' }
  })
  return cachedAesScript
}

/**
 * Fetches a Comet CMS URL and bypasses the free-hosting JavaScript cookie gate.
 */
export async function fetchCometApi(url: string, query: CometQuery, token: string, baseUrl: string): Promise<unknown> {
  const activeCookie = cachedCookie && cachedCookie.expiresAt > Date.now() ? cachedCookie.value : ''
  const firstBody = await $fetch<string>(url, {
    query,
    headers: createHeaders(token, activeCookie),
    responseType: 'text'
  })
  if (isJsonPayload(firstBody)) {
    return JSON.parse(firstBody)
  }
  const aesScript = await executeAesScript(baseUrl)
  const cookie = await solveHostChallenge(firstBody, aesScript)
  cachedCookie = {
    value: cookie,
    expiresAt: Date.now() + 5 * 60 * 60 * 1000
  }
  const retryBody = await $fetch<string>(url, {
    query: { ...query, i: '1' },
    headers: createHeaders(token, cookie),
    responseType: 'text'
  })
  if (!isJsonPayload(retryBody)) {
    throw createError({ statusCode: 502, statusMessage: 'Comet CMS did not return JSON' })
  }
  return JSON.parse(retryBody)
}
