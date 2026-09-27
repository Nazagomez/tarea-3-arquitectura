import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const baseUrl = (process.env.NUXT_COMET_URL || 'https://cms-una.gt.tc').replace(/\/$/, '')
const workspace = (process.env.NUXT_COMET_WORKSPACE || 'cms-una').trim()
const token = (process.env.NUXT_COMET_API_TOKEN || '').trim()

if (!token) {
  console.error('Defina NUXT_COMET_API_TOKEN antes de ejecutar el seed.')
  process.exit(1)
}

const apiUrl = `${baseUrl}/api/v1/workspaces/${workspace}`
const schema = JSON.parse(await readFile(resolve('cms/schema.json'), 'utf8'))
const seed = JSON.parse(await readFile(resolve('cms/seed.json'), 'utf8'))

async function executeRequest(method, path, body) {
  const response = await fetch(`${apiUrl}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message = payload?.error?.message || response.statusText
    throw new Error(`${method} ${path}: ${message}`)
  }
  return payload.data
}

async function executeCreateType(definition) {
  try {
    await executeRequest('POST', '/content-types', definition)
    console.log(`Tabla creada: ${definition.name}`)
  } catch (error) {
    console.log(`Tabla ${definition.name}: ${error.message}`)
  }
}

async function executeCreateEntry(collection, entry, relationMap) {
  const data = { ...entry.data }
  if (collection === 'generos') {
    data.familia = relationMap.familias[data.familia]
  }
  if (collection === 'libros') {
    data.autor = relationMap.autores[data.autor]
    data.editorial = relationMap.editoriales[data.editorial]
    data.genero = relationMap.generos[data.genero]
  }
  const created = await executeRequest('POST', `/content/${collection}`, {
    title: entry.title,
    slug: entry.slug,
    status: 'published',
    data
  })
  return created
}

const relationMap = {
  familias: {},
  generos: {},
  autores: {},
  editoriales: {}
}

await executeCreateType(schema.familias)
await executeCreateType(schema.generos)
await executeCreateType(schema.autores)
await executeCreateType(schema.editoriales)
await executeCreateType(schema.libros)

for (const entry of seed.familias) {
  const created = await executeCreateEntry('familias', entry, relationMap)
  relationMap.familias[entry.slug] = created.id
  console.log(`Familia: ${entry.title}`)
}

for (const entry of seed.generos) {
  const created = await executeCreateEntry('generos', entry, relationMap)
  relationMap.generos[entry.slug] = created.id
  console.log(`Género: ${entry.title}`)
}

for (const entry of seed.autores) {
  const created = await executeCreateEntry('autores', entry, relationMap)
  relationMap.autores[entry.slug] = created.id
  console.log(`Autor: ${entry.title}`)
}

for (const entry of seed.editoriales) {
  const created = await executeCreateEntry('editoriales', entry, relationMap)
  relationMap.editoriales[entry.slug] = created.id
  console.log(`Editorial: ${entry.title}`)
}

for (const entry of seed.libros) {
  await executeCreateEntry('libros', entry, relationMap)
  console.log(`Libro: ${entry.title}`)
}

console.log('Carga de Comet CMS finalizada.')
