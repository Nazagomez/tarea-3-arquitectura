import type { CatalogAuthor, CatalogBook, CatalogFamily, CatalogGenre, CatalogPublisher } from '../types/catalog-models'
import {
  mapCatalogAuthor,
  mapCatalogBook,
  mapCatalogFamily,
  mapCatalogGenre,
  mapCatalogPublisher
} from '../utils/map-catalog'

const BOOK_INCLUDE = 'autor,editorial,genero'
const GENRE_INCLUDE = 'familia'

/**
 * Loads the catalog collections published in Comet CMS.
 */
export function useCatalog() {
  const api = useCometApi()
  async function executeFamilies(): Promise<CatalogFamily[]> {
    const entries = await api.executeList('familias', { sort: 'nombre' })
    return entries.map(mapCatalogFamily)
  }
  async function executeGenres(): Promise<CatalogGenre[]> {
    const entries = await api.executeList('generos', { include: GENRE_INCLUDE, sort: 'nombre' })
    return entries.map(mapCatalogGenre)
  }
  async function executeAuthors(): Promise<CatalogAuthor[]> {
    const entries = await api.executeList('autores', { sort: 'nombre' })
    return entries.map(mapCatalogAuthor)
  }
  async function executePublishers(): Promise<CatalogPublisher[]> {
    const entries = await api.executeList('editoriales', { sort: 'nombre' })
    return entries.map(mapCatalogPublisher)
  }
  async function executeBooks(): Promise<CatalogBook[]> {
    const entries = await api.executeList('libros', { include: BOOK_INCLUDE, sort: 'num' })
    return entries.map(mapCatalogBook)
  }
  async function executeBook(identifier: string): Promise<CatalogBook | null> {
    const entry = await api.executeEntry('libros', identifier, { include: BOOK_INCLUDE })
    return entry ? mapCatalogBook(entry) : null
  }
  async function executeAuthor(identifier: string): Promise<CatalogAuthor | null> {
    const entry = await api.executeEntry('autores', identifier)
    return entry ? mapCatalogAuthor(entry) : null
  }
  async function executePublisher(identifier: string): Promise<CatalogPublisher | null> {
    const entry = await api.executeEntry('editoriales', identifier)
    return entry ? mapCatalogPublisher(entry) : null
  }
  async function executeBooksByAuthor(authorId: string): Promise<CatalogBook[]> {
    const entries = await api.executeList('libros', {
      include: BOOK_INCLUDE,
      'filter[autor]': authorId
    })
    return entries.map(mapCatalogBook)
  }
  async function executeBooksByPublisher(publisherId: string): Promise<CatalogBook[]> {
    const entries = await api.executeList('libros', {
      include: BOOK_INCLUDE,
      'filter[editorial]': publisherId
    })
    return entries.map(mapCatalogBook)
  }
  return {
    executeFamilies,
    executeGenres,
    executeAuthors,
    executePublishers,
    executeBooks,
    executeBook,
    executeAuthor,
    executePublisher,
    executeBooksByAuthor,
    executeBooksByPublisher
  }
}
