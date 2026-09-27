<script setup lang="ts">
const catalog = useCatalog()
const route = useRoute()
const searchQuery = ref(typeof route.query.q === 'string' ? route.query.q : '')
const currentPage = computed(() => parsePageQuery(route.query.page))

const { data: books } = await useAsyncData('books-search-catalog', () => catalog.executeBooks())

const matchedBooks = computed(() => {
  const term = searchQuery.value.trim().toLowerCase()
  if (!term || !books.value) {
    return []
  }
  return books.value.filter((book) => {
    const hasTermInTitle = book.titulo.toLowerCase().includes(term)
    const hasTermInAuthor = book.autorNombre.toLowerCase().includes(term)
    const hasTermInDescription = book.descripcion.toLowerCase().includes(term)
    return hasTermInTitle || hasTermInAuthor || hasTermInDescription
  })
})

const pagination = computed(() => createPagination(matchedBooks.value.length, currentPage.value))

const visibleBooks = computed(() => {
  const start = pagination.value.skip
  const end = start + pagination.value.limit
  return matchedBooks.value.slice(start, end)
})

function executeSearch(): void {
  void navigateTo({
    path: '/buscar',
    query: searchQuery.value.trim() ? { q: searchQuery.value.trim() } : {}
  })
}

function executePageChange(page: number): void {
  void navigateTo({
    path: '/buscar',
    query: {
      ...(searchQuery.value.trim() ? { q: searchQuery.value.trim() } : {}),
      ...(page === 1 ? {} : { page: String(page) })
    }
  })
}

useSeoMeta({
  title: 'Buscar | Best Books Ever',
  description: 'Búsqueda sobre título, autor y descripción de los libros publicados en Comet CMS.'
})
</script>

<template>
  <div class="container">
    <HeaderView />
    <p class="hierarchy">
      <NuxtLink to="/">Inicio</NuxtLink> / Buscar
    </p>
    <h3 style="margin-top: 15px">Buscar libros</h3>
    <p>La búsqueda recorre título, autor y sinopsis de todo el catálogo publicado en el CMS.</p>
    <CmsStatusView :is-empty="!books?.length" />
    <form @submit.prevent="executeSearch">
      <input
        v-model="searchQuery"
        class="u-full-width"
        type="search"
        placeholder="Escriba un término, por ejemplo hunger, king o dystopia"
      >
      <button class="button-primary" type="submit">Buscar</button>
    </form>
    <div v-if="searchQuery.trim()">
      <p>{{ formatBookCount(matchedBooks.length) }} resultados para “{{ searchQuery.trim() }}”.</p>
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
      <p v-if="matchedBooks.length === 0">No se encontraron libros para ese término.</p>
      <PaginationView
        :page="pagination.page"
        :page-count="pagination.pageCount"
        @change="executePageChange"
      />
    </div>
    <FooterView />
  </div>
</template>
