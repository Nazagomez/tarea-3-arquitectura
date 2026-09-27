<script setup lang="ts">
const catalog = useCatalog()
const route = useRoute()
const familySlug = String(route.params.familia)

const { data: families } = await useAsyncData('family-list', () => catalog.executeFamilies())
const { data: genres } = await useAsyncData('family-genres', () => catalog.executeGenres())
const { data: books } = await useAsyncData('family-books', () => catalog.executeBooks())

const family = computed(() => families.value?.find((item) => item.slug === familySlug) ?? null)

if (!family.value) {
  throw createError({ statusCode: 404, statusMessage: 'Familia de género no encontrada' })
}

const familyGenres = computed(() => {
  return (genres.value ?? []).filter((genre) => genre.familiaSlug === familySlug)
})

const familyCount = computed(() => {
  return (books.value ?? []).filter((book) => book.familiaSlug === familySlug).length
})

useSeoMeta({
  title: `${family.value.nombre} | Best Books Ever`,
  description: family.value.descripcion
})
</script>

<template>
  <div class="container">
    <HeaderView />
    <p class="hierarchy">
      <NuxtLink to="/">Inicio</NuxtLink> /
      <NuxtLink to="/generos">Géneros</NuxtLink> /
      {{ family.nombre }}
    </p>
    <h3 style="margin-top: 15px">{{ family.nombre }}</h3>
    <p>{{ family.descripcion }} Hay {{ formatBookCount(familyCount) }} libros en esta familia.</p>
    <ul>
      <li v-for="genre in familyGenres" :key="genre.id">
        <NuxtLink :to="`/generos/${familySlug}/${genre.slug}`">{{ genre.nombre }}</NuxtLink>
      </li>
    </ul>
    <FooterView />
  </div>
</template>
