<script setup lang="ts">
type BookListItemProps = {
  readonly slug: string
  readonly num: number
  readonly titulo: string
  readonly autorNombre: string
  readonly autorSlug?: string
  readonly calificacion: number
  readonly generoNombre: string
  readonly portada?: string
}

withDefaults(defineProps<BookListItemProps>(), {
  autorSlug: '',
  portada: ''
})
</script>

<template>
  <li class="book-card">
    <img
      v-if="portada"
      class="book-card-cover"
      :src="portada"
      :alt="`Portada de ${titulo}`"
    >
    <div v-else class="book-card-fallback">Sin portada</div>
    <div>
      <NuxtLink class="book-card-title" :to="`/libros/${slug}`">{{ titulo }}</NuxtLink>
      <p class="book-card-meta">
        #{{ num }} —
        <NuxtLink v-if="autorSlug" :to="`/autores/${autorSlug}`">{{ autorNombre }}</NuxtLink>
        <span v-else>{{ autorNombre }}</span>
        — {{ formatBookRating(calificacion) }} — {{ generoNombre }}
      </p>
    </div>
  </li>
</template>
