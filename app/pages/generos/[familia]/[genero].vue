<script setup lang="ts">
const catalog = useCatalog()
const route = useRoute()
const familySlug = String(route.params.familia)
const genreSlug = String(route.params.genero)
const currentPage = computed(() => parsePageQuery(route.query.page))

const { data: genres } = await useAsyncData('genre-detail-list', () => catalog.executeGenres())
const { data: books } = await useAsyncData('genre-detail-books', () => catalog.executeBooks())

const selectedGenre = computed(() => {
  return genres.value?.find((genre) => genre.slug === genreSlug && genre.familiaSlug === familySlug) ?? null
})

if (!selectedGenre.value) {
  throw createError({ statusCode: 404, statusMessage: 'Género no encontrado' })
}

const genreBooks = computed(() => {
  return (books.value ?? [])
    .filter((book) => book.generoSlug === genreSlug)
    .sort((left, right) => right.puntuacionBbe - left.puntuacionBbe)
})

const pagination = computed(() => createPagination(genreBooks.value.length, currentPage.value))

const visibleBooks = computed(() => {
  const start = pagination.value.skip
  const end = start + pagination.value.limit
  return genreBooks.value.slice(start, end)
})

function executePageChange(page: number): void {
  void navigateTo({
    path: route.path,
    query: page === 1 ? {} : { page: String(page) }
  })
}

useSeoMeta({
  title: `${selectedGenre.value.nombre} | Best Books Ever`,
  description: `Libros de ${selectedGenre.value.nombre} publicados en Comet CMS.`
})
</script>

<template>
  <div class="container">
    <HeaderView />
    <p class="hierarchy">
      <NuxtLink to="/">Inicio</NuxtLink> /
      <NuxtLink to="/generos">Géneros</NuxtLink> /
      <NuxtLink :to="`/generos/${familySlug}`">{{ selectedGenre.familiaNombre }}</NuxtLink> /
      {{ selectedGenre.nombre }}
    </p>
    <h3 style="margin-top: 15px">{{ selectedGenre.nombre }}</h3>
    <p>{{ formatBookCount(genreBooks.length) }} libros, ordenados por puntaje Best Books Ever.</p>
    <ul class="book-list">
      <BookListItem
        v-for="book in visibleBooks"
        :key="book.id"
        :slug="book.slug"
        :num="book.num"
        :titulo="book.titulo"
        :autor-nombre="book.autorNombre"
        :autor-slug="book.autorSlug"
        :calificacion="book.calificacion"
        :genero-nombre="book.generoNombre"
        :portada="book.portada"
      />
    </ul>
    <p v-if="genreBooks.length === 0">No hay libros en este género.</p>
    <PaginationView
      :page="pagination.page"
      :page-count="pagination.pageCount"
      @change="executePageChange"
    />
    <FooterView />
  </div>
</template>
