import type { CometEntry } from '../types/comet-entry'
import type {
  CatalogAuthor,
  CatalogBook,
  CatalogFamily,
  CatalogGenre,
  CatalogPublisher
} from '../types/catalog-models'
import {
  readNestedFamilyName,
  readNestedFamilySlug,
  readRelationId,
  readRelationName,
  readRelationSlug
} from './read-relation'

type FamilyData = {
  readonly nombre?: string
  readonly descripcion?: string
}

type GenreData = {
  readonly nombre?: string
  readonly descripcion?: string
  readonly familia?: unknown
}

type AuthorData = {
  readonly nombre?: string
  readonly nacionalidad?: string
  readonly biografia?: string
  readonly imagen?: unknown
}

type PublisherData = {
  readonly nombre?: string
  readonly pais?: string
}

type BookData = {
  readonly num?: number
  readonly titulo?: string
  readonly serie?: string
  readonly calificacion?: number
  readonly descripcion?: string
  readonly idioma?: string
  readonly isbn?: string
  readonly paginas?: number
  readonly anio?: number
  readonly premios?: string
  readonly portada?: unknown
  readonly precio?: string
  readonly puntuacion_bbe?: number
  readonly votos_bbe?: number
  readonly resenas?: number
  readonly aprobacion?: number
  readonly autor?: unknown
  readonly editorial?: unknown
  readonly genero?: unknown
}

/**
 * Converts a Comet media or URL field into a single image URL.
 */
export function readCoverUrl(value: unknown): string {
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value) && typeof value[0] === 'string') {
    return value[0]
  }
  return ''
}

/**
 * Maps a Comet family entry to the catalog model.
 */
export function mapCatalogFamily(entry: CometEntry<FamilyData>): CatalogFamily {
  return {
    id: entry.id,
    slug: entry.slug,
    nombre: entry.data.nombre ?? entry.title,
    descripcion: entry.data.descripcion ?? ''
  }
}

/**
 * Maps a Comet genre entry to the catalog model.
 */
export function mapCatalogGenre(entry: CometEntry<GenreData>): CatalogGenre {
  return {
    id: entry.id,
    slug: entry.slug,
    nombre: entry.data.nombre ?? entry.title,
    descripcion: entry.data.descripcion ?? '',
    familiaId: readRelationId(entry.data.familia),
    familiaSlug: readRelationSlug(entry.data.familia),
    familiaNombre: readRelationName(entry.data.familia)
  }
}

/**
 * Maps a Comet author entry to the catalog model.
 */
export function mapCatalogAuthor(entry: CometEntry<AuthorData>): CatalogAuthor {
  return {
    id: entry.id,
    slug: entry.slug,
    nombre: entry.data.nombre ?? entry.title,
    nacionalidad: entry.data.nacionalidad ?? '',
    biografia: entry.data.biografia ?? '',
    imagen: readCoverUrl(entry.data.imagen)
  }
}

/**
 * Maps a Comet publisher entry to the catalog model.
 */
export function mapCatalogPublisher(entry: CometEntry<PublisherData>): CatalogPublisher {
  return {
    id: entry.id,
    slug: entry.slug,
    nombre: entry.data.nombre ?? entry.title,
    pais: entry.data.pais ?? ''
  }
}

/**
 * Maps a Comet book entry to the catalog model.
 */
export function mapCatalogBook(entry: CometEntry<BookData>): CatalogBook {
  return {
    id: entry.id,
    slug: entry.slug,
    num: Number(entry.data.num ?? 0),
    titulo: entry.data.titulo ?? entry.title,
    serie: entry.data.serie ?? '',
    calificacion: Number(entry.data.calificacion ?? 0),
    descripcion: entry.data.descripcion ?? '',
    idioma: entry.data.idioma ?? '',
    isbn: entry.data.isbn ?? '',
    paginas: Number(entry.data.paginas ?? 0),
    anio: Number(entry.data.anio ?? 0),
    premios: entry.data.premios ?? '',
    portada: readCoverUrl(entry.data.portada),
    precio: entry.data.precio ?? '',
    puntuacionBbe: Number(entry.data.puntuacion_bbe ?? 0),
    votosBbe: Number(entry.data.votos_bbe ?? 0),
    resenas: Number(entry.data.resenas ?? 0),
    aprobacion: Number(entry.data.aprobacion ?? 0),
    autorId: readRelationId(entry.data.autor),
    autorSlug: readRelationSlug(entry.data.autor),
    autorNombre: readRelationName(entry.data.autor),
    editorialId: readRelationId(entry.data.editorial),
    editorialSlug: readRelationSlug(entry.data.editorial),
    editorialNombre: readRelationName(entry.data.editorial),
    generoId: readRelationId(entry.data.genero),
    generoSlug: readRelationSlug(entry.data.genero),
    generoNombre: readRelationName(entry.data.genero),
    familiaSlug: readNestedFamilySlug(entry.data.genero),
    familiaNombre: readNestedFamilyName(entry.data.genero)
  }
}
