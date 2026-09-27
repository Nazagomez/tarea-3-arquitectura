<script setup lang="ts">
const catalog = useCatalog()

const { data: authors } = await useAsyncData('authors-index', () => catalog.executeAuthors())
const { data: books } = await useAsyncData('authors-books', () => catalog.executeBooks())

function getAuthorBookCount(authorId: string, authorSlug: string): number {
  return (books.value ?? []).filter((book) => book.autorId === authorId || book.autorSlug === authorSlug).length
}

useSeoMeta({
  title: 'Autores | Best Books Ever',
  description: 'Autores publicados en Comet CMS y enlazados a sus libros.'
})
</script>

<template>
  <div class="container">
    <HeaderView />
    <p class="hierarchy">
      <NuxtLink to="/">Inicio</NuxtLink> / Autores
    </p>
    <h3 style="margin-top: 15px">Autores</h3>
    <p>Tabla secundaria de Comet CMS. Cada libro apunta a un autor mediante una llave foránea.</p>
    <CmsStatusView :is-empty="!authors?.length" />
    <ul>
      <li v-for="author in authors" :key="author.id">
        <NuxtLink :to="`/autores/${author.slug}`">{{ author.nombre }}</NuxtLink>
        — {{ formatBookCount(getAuthorBookCount(author.id, author.slug)) }} libros
      </li>
    </ul>
    <FooterView />
  </div>
</template>
