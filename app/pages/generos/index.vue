<script setup lang="ts">
const catalog = useCatalog()

const { data: families } = await useAsyncData('genre-families', () => catalog.executeFamilies())
const { data: genres } = await useAsyncData('genre-index', () => catalog.executeGenres())

function getFamilyGenres(familySlug: string) {
  return (genres.value ?? []).filter((genre) => genre.familiaSlug === familySlug)
}

useSeoMeta({
  title: 'Géneros | Best Books Ever',
  description: 'Jerarquía de familias y géneros literarios publicada en Comet CMS.'
})
</script>

<template>
  <div class="container">
    <HeaderView />
    <p class="hierarchy">
      <NuxtLink to="/">Inicio</NuxtLink> / Géneros
    </p>
    <h3 style="margin-top: 15px">Explorar por género</h3>
    <p>
      Cada género pertenece a una familia mediante una llave foránea configurada en Comet CMS.
    </p>
    <CmsStatusView :is-empty="!families?.length" />
    <div class="row">
      <div v-for="family in families" :key="family.id" class="four columns family-card">
        <h5>
          <NuxtLink :to="`/generos/${family.slug}`">{{ family.nombre }}</NuxtLink>
        </h5>
        <p>{{ family.descripcion }}</p>
        <ul class="genre-link-list">
          <li v-for="genre in getFamilyGenres(family.slug)" :key="genre.id">
            <NuxtLink :to="`/generos/${family.slug}/${genre.slug}`">{{ genre.nombre }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <FooterView />
  </div>
</template>
