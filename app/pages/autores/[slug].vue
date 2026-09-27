<script setup lang="ts">
const catalog = useCatalog()
const route = useRoute()
const authorSlug = String(route.params.slug)

const { data: author } = await useAsyncData(`author-${authorSlug}`, () => {
  return catalog.executeAuthor(authorSlug)
})

if (!author.value) {
  throw createError({ statusCode: 404, statusMessage: 'Autor no encontrado' })
}

const { data: authorBooks } = await useAsyncData(`author-books-${author.value.id}`, () => {
  return catalog.executeBooksByAuthor(author.value?.id ?? '')
})

useSeoMeta({
  title: `${author.value.nombre} | Best Books Ever`,
  description: author.value.biografia.slice(0, 160)
})
</script>

<template>
  <div class="container">
    <HeaderView />
    <p class="hierarchy">
      <NuxtLink to="/">Inicio</NuxtLink> /
      <NuxtLink to="/autores">Autores</NuxtLink> /
      {{ author.nombre }}
    </p>
    <div class="row">
      <div class="four columns">
        <img
          v-if="author.imagen"
          class="u-max-full-width cover-image"
          :src="author.imagen"
          :alt="author.nombre"
        >
        <div v-else class="cover-placeholder">Imagen no disponible</div>
      </div>
      <div class="eight columns">
        <h4>{{ author.nombre }}</h4>
        <p v-if="author.nacionalidad">Nacionalidad: {{ author.nacionalidad }}</p>
        <p>{{ author.biografia || 'Este autor no incluye biografía.' }}</p>
        <h5>Libros</h5>
        <ul class="book-list">
          <BookListItem
            v-for="book in authorBooks"
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
        <p v-if="!authorBooks?.length">Este autor todavía no tiene libros enlazados.</p>
      </div>
    </div>
    <FooterView />
  </div>
</template>
