<script setup lang="ts">
const catalog = useCatalog()
const route = useRoute()
const currentPage = computed(() => parsePageQuery(route.query.page))

const { data: books } = await useAsyncData('books-ranked', () => catalog.executeBooks())

const rankedBooks = computed(() => {
  return [...(books.value ?? [])].sort((left, right) => left.num - right.num)
})

const pagination = computed(() => createPagination(rankedBooks.value.length, currentPage.value))

const visibleBooks = computed(() => {
  const start = pagination.value.skip
  const end = start + pagination.value.limit
  return rankedBooks.value.slice(start, end)
})

function executePageChange(page: number): void {
  void navigateTo({
    path: '/libros',
    query: page === 1 ? {} : { page: String(page) }
  })
}

useSeoMeta({
  title: 'Ranking | Best Books Ever',
  description: 'Listado paginado de los libros publicados en Comet CMS.'
})
</script>

<template>
  <div class="container">
    <HeaderView />
    <p class="hierarchy">
      <NuxtLink to="/">Inicio</NuxtLink> / Ranking
    </p>
    <h3 style="margin-top: 15px">Ranking Best Books Ever</h3>
    <p>
      {{ formatBookCount(rankedBooks.length) }} libros publicados en Comet CMS, ordenados por el número de la lista.
    </p>
    <CmsStatusView :is-empty="rankedBooks.length === 0" />
    <ol class="book-list-ordered" :start="pagination.skip + 1">
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
    </ol>
    <PaginationView
      :page="pagination.page"
      :page-count="pagination.pageCount"
      @change="executePageChange"
    />
    <FooterView />
  </div>
</template>
