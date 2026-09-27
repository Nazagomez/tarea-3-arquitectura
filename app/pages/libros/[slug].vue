<script setup lang="ts">
const catalog = useCatalog()
const route = useRoute()
const bookSlug = String(route.params.slug)

const { data: book } = await useAsyncData(`book-${bookSlug}`, () => {
  return catalog.executeBook(bookSlug)
})

const { data: books } = await useAsyncData('book-detail-neighbors', () => catalog.executeBooks())

if (!book.value) {
  throw createError({ statusCode: 404, statusMessage: 'Libro no encontrado' })
}

const neighborBooks = computed(() => {
  const catalogBooks = [...(books.value ?? [])].sort((left, right) => left.num - right.num)
  const currentIndex = catalogBooks.findIndex((item) => item.slug === bookSlug)
  return {
    previousBook: currentIndex > 0 ? catalogBooks[currentIndex - 1] : null,
    nextBook: currentIndex >= 0 && currentIndex < catalogBooks.length - 1 ? catalogBooks[currentIndex + 1] : null
  }
})

const genrePath = computed(() => {
  if (!book.value?.familiaSlug || !book.value.generoSlug) {
    return '/generos'
  }
  return `/generos/${book.value.familiaSlug}/${book.value.generoSlug}`
})

useSeoMeta({
  title: `${book.value.titulo} | Best Books Ever`,
  description: book.value.descripcion.slice(0, 160)
})
</script>

<template>
  <div class="container">
    <HeaderView />
    <p class="hierarchy">
      <NuxtLink to="/">Inicio</NuxtLink> /
      <NuxtLink to="/generos">Géneros</NuxtLink> /
      <NuxtLink v-if="book.familiaSlug" :to="`/generos/${book.familiaSlug}`">{{ book.familiaNombre }}</NuxtLink>
      <span v-else>{{ book.familiaNombre || 'Familia' }}</span> /
      <NuxtLink :to="genrePath">{{ book.generoNombre }}</NuxtLink> /
      {{ book.titulo }}
    </p>
    <div class="row">
      <div class="four columns">
        <img
          v-if="book.portada"
          class="u-max-full-width cover-image"
          :src="book.portada"
          :alt="`Portada de ${book.titulo}`"
        >
        <div v-else class="cover-placeholder">Portada no disponible</div>
      </div>
      <div class="eight columns">
        <h4>{{ book.titulo }}</h4>
        <p v-if="book.serie" class="book-meta">Serie: {{ book.serie }}</p>
        <p>
          por
          <NuxtLink v-if="book.autorSlug" :to="`/autores/${book.autorSlug}`">{{ book.autorNombre }}</NuxtLink>
          <span v-else>{{ book.autorNombre }}</span>
          — Calificación: {{ formatBookRating(book.calificacion) }}
          ({{ formatBookCount(book.resenas) }} reseñas, {{ book.aprobacion }}% de aprobación)
        </p>
        <p>
          Género:
          <NuxtLink :to="genrePath">{{ book.generoNombre }}</NuxtLink>
          — Familia: {{ book.familiaNombre }}
        </p>
        <div class="row">
          <div class="four columns fact-box">
            <span class="fact-label">Año</span>
            {{ formatPublishYear(book.anio) }}
          </div>
          <div class="four columns fact-box">
            <span class="fact-label">Páginas</span>
            {{ book.paginas || 'No disponible' }}
          </div>
          <div class="four columns fact-box">
            <span class="fact-label">Idioma</span>
            {{ book.idioma || 'No disponible' }}
          </div>
        </div>
        <div class="row">
          <div class="four columns fact-box">
            <span class="fact-label">Editorial</span>
            <NuxtLink v-if="book.editorialSlug" :to="`/editoriales/${book.editorialSlug}`">
              {{ book.editorialNombre }}
            </NuxtLink>
            <span v-else>{{ book.editorialNombre || 'No disponible' }}</span>
          </div>
          <div class="four columns fact-box">
            <span class="fact-label">Puntaje BBE</span>
            {{ formatBookCount(book.puntuacionBbe) }} ({{ formatBookCount(book.votosBbe) }} votos)
          </div>
          <div class="four columns fact-box">
            <span class="fact-label">Precio</span>
            {{ formatBookPrice(book.precio) }}
          </div>
        </div>
        <p v-if="book.isbn && book.isbn !== '9999999999999'">ISBN: {{ book.isbn }}</p>
        <h5>Sinopsis</h5>
        <p class="synopsis">{{ book.descripcion || 'Este registro no incluye descripción.' }}</p>
        <p v-if="book.premios"><strong>Premios:</strong> {{ book.premios }}</p>
        <div class="row neighbor-nav">
          <div class="six columns">
            <NuxtLink v-if="neighborBooks.previousBook" :to="`/libros/${neighborBooks.previousBook.slug}`">
              ← {{ neighborBooks.previousBook.titulo }}
            </NuxtLink>
          </div>
          <div class="six columns" style="text-align: right">
            <NuxtLink v-if="neighborBooks.nextBook" :to="`/libros/${neighborBooks.nextBook.slug}`">
              {{ neighborBooks.nextBook.titulo }} →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <FooterView />
  </div>
</template>
