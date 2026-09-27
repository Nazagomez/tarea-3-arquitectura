export type CatalogFamily = {
  readonly id: string
  readonly slug: string
  readonly nombre: string
  readonly descripcion: string
}

export type CatalogGenre = {
  readonly id: string
  readonly slug: string
  readonly nombre: string
  readonly descripcion: string
  readonly familiaId: string
  readonly familiaSlug: string
  readonly familiaNombre: string
}

export type CatalogAuthor = {
  readonly id: string
  readonly slug: string
  readonly nombre: string
  readonly nacionalidad: string
  readonly biografia: string
  readonly imagen: string
}

export type CatalogPublisher = {
  readonly id: string
  readonly slug: string
  readonly nombre: string
  readonly pais: string
}

export type CatalogBook = {
  readonly id: string
  readonly slug: string
  readonly num: number
  readonly titulo: string
  readonly serie: string
  readonly calificacion: number
  readonly descripcion: string
  readonly idioma: string
  readonly isbn: string
  readonly paginas: number
  readonly anio: number
  readonly premios: string
  readonly portada: string
  readonly precio: string
  readonly puntuacionBbe: number
  readonly votosBbe: number
  readonly resenas: number
  readonly aprobacion: number
  readonly autorId: string
  readonly autorSlug: string
  readonly autorNombre: string
  readonly editorialId: string
  readonly editorialSlug: string
  readonly editorialNombre: string
  readonly generoId: string
  readonly generoSlug: string
  readonly generoNombre: string
  readonly familiaSlug: string
  readonly familiaNombre: string
}
