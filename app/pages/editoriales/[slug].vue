<script setup lang="ts">
const catalog = useCatalog()
const route = useRoute()
const publisherSlug = String(route.params.slug)

const { data: publisher } = await useAsyncData(`publisher-${publisherSlug}`, () => {
  return catalog.executePublisher(publisherSlug)
})

if (!publisher.value) {
  throw createError({ statusCode: 404, statusMessage: 'Editorial no encontrada' })
}

const { data: publisherBooks } = await useAsyncData(`publisher-books-${publisher.value.id}`, () => {
  return catalog.executeBooksByPublisher(publisher.value?.id ?? '')
})

useSeoMeta({
  title: `${publisher.value.nombre} | Best Books Ever`,
  description: `Libros publicados por ${publisher.value.nombre} según Comet CMS.`
})
</script>

<template>
  <div class="container">
    <HeaderView />
    <p class="hierarchy">
      <NuxtLink to="/">Inicio</NuxtLink> /
      <NuxtLink to="/editoriales">Editoriales</NuxtLink> /
      {{ publisher.nombre }}
    </p>
    <h4>{{ publisher.nombre }}</h4>
    <p v-if="publisher.pais">País: {{ publisher.pais }}</p>
    <h5>Libros</h5>
    <ul class="book-list">
      <BookListItem
        v-for="book in publisherBooks"
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
    <p v-if="!publisherBooks?.length">Esta editorial todavía no tiene libros enlazados.</p>
    <FooterView />
  </div>
</template>
