<script setup lang="ts">
type PaginationProps = {
  readonly page: number
  readonly pageCount: number
}

const props = defineProps<PaginationProps>()

const emit = defineEmits<{
  change: [page: number]
}>()

const visiblePages = computed(() => {
  const pages: number[] = []
  const start = Math.max(1, props.page - 2)
  const end = Math.min(props.pageCount, props.page + 2)
  for (let i = start; i <= end; i += 1) {
    pages.push(i)
  }
  return pages
})

function executePageChange(nextPage: number): void {
  if (nextPage < 1 || nextPage > props.pageCount || nextPage === props.page) {
    return
  }
  emit('change', nextPage)
}
</script>

<template>
  <div v-if="pageCount > 1" class="pagination">
    <button class="button" type="button" :disabled="page === 1" @click="executePageChange(page - 1)">
      Anterior
    </button>
    <button
      v-for="item in visiblePages"
      :key="item"
      class="button"
      :class="{ 'button-primary': item === page }"
      type="button"
      @click="executePageChange(item)"
    >
      {{ item }}
    </button>
    <button class="button" type="button" :disabled="page === pageCount" @click="executePageChange(page + 1)">
      Siguiente
    </button>
    <span class="pagination-meta">Página {{ page }} de {{ pageCount }}</span>
  </div>
</template>
