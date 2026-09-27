import { fetchCometApi } from '../../utils/fetch-comet-api'

/**
 * Forwards catalog requests to Comet CMS and attaches the API token on the server.
 */
export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path')
  const config = useRuntimeConfig()
  const baseUrl = String(config.cometUrl).replace(/\/$/, '')
  const workspace = String(config.cometWorkspace)
  const token = String(config.cometApiToken || '')
  return fetchCometApi(
    `${baseUrl}/api/v1/workspaces/${workspace}/${path}`,
    getQuery(event),
    token,
    baseUrl
  )
})
