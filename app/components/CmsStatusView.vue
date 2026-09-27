<script setup lang="ts">
type CmsStatusProps = {
  readonly isEmpty: boolean
}

defineProps<CmsStatusProps>()
</script>

<template>
  <p v-if="isEmpty" class="cms-alert">
    El CMS no devolvió registros. Revise el token, el workspace, que las tablas
    estén en privado y que cada entrada esté publicada.
  </p>
</template>
