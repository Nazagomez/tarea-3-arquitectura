<script setup lang="ts">
const catalog = useCatalog()

const { data: books } = await useAsyncData('home-books', () => catalog.executeBooks())
const { data: families } = await useAsyncData('home-families', () => catalog.executeFamilies())

useSeoMeta({
  title: 'Inicio | Best Books Ever',
  description: 'Catálogo Best Books Ever publicado desde Comet CMS, con géneros, autores y editoriales relacionados.'
})
</script>

<template>
  <div class="container">
    <HeaderView />
    <h2 style="margin-top: 15px">Best Books Ever</h2>
    <p>
      Adaptación del proyecto 1 al CMS headless <strong>Comet CMS</strong>.
      El sitio lee {{ formatBookCount(books?.length ?? 0) }} libros publicados
      y resuelve las llaves foráneas hacia géneros, autores y editoriales.
    </p>
    <CmsStatusView :is-empty="!books?.length" />
    <div class="row">
      <div class="six columns stat-box">
        <h5>Explorar por género</h5>
        <p>Las familias y géneros viven en tablas distintas y se enlazan en el CMS.</p>
        <ul>
          <li v-for="family in families" :key="family.id">
            <NuxtLink :to="`/generos/${family.slug}`">{{ family.nombre }}</NuxtLink>
          </li>
        </ul>
      </div>
      <div class="six columns stat-box">
        <h5>Otras formas de llegar a un libro</h5>
        <ul>
          <li><NuxtLink to="/libros">Ranking Best Books Ever</NuxtLink></li>
          <li><NuxtLink to="/autores">Autores relacionados</NuxtLink></li>
          <li><NuxtLink to="/editoriales">Editoriales relacionadas</NuxtLink></li>
          <li><NuxtLink to="/buscar">Búsqueda por título, autor o descripción</NuxtLink></li>
        </ul>
      </div>
    </div>
    <FooterView />
  </div>
</template>
