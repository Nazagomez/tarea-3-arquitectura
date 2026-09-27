<script setup lang="ts">
const catalog = useCatalog()

const { data: publishers } = await useAsyncData('publishers-index', () => catalog.executePublishers())
const { data: books } = await useAsyncData('publishers-books', () => catalog.executeBooks())

function getPublisherBookCount(publisherId: string, publisherSlug: string): number {
  return (books.value ?? []).filter((book) => {
    return book.editorialId === publisherId || book.editorialSlug === publisherSlug
  }).length
}

useSeoMeta({
  title: 'Editoriales | Best Books Ever',
  description: 'Editoriales publicadas en Comet CMS y enlazadas a sus libros.'
})
</script>

<template>
  <div class="container">
    <HeaderView />
    <p class="hierarchy">
      <NuxtLink to="/">Inicio</NuxtLink> / Editoriales
    </p>
    <h3 style="margin-top: 15px">Editoriales</h3>
    <p>Tabla secundaria de Comet CMS. Cada libro apunta a una editorial mediante una llave foránea.</p>
    <CmsStatusView :is-empty="!publishers?.length" />
    <ul>
      <li v-for="publisher in publishers" :key="publisher.id">
        <NuxtLink :to="`/editoriales/${publisher.slug}`">{{ publisher.nombre }}</NuxtLink>
        — {{ formatBookCount(getPublisherBookCount(publisher.id, publisher.slug)) }} libros
      </li>
    </ul>
    <FooterView />
  </div>
</template>
