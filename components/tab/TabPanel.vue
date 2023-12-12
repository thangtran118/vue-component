<script setup lang="ts">
const props = defineProps<{
  label: string
}>()

const isTabActive = inject('isTabActive') as (tabLabel: string) => boolean
</script>

<template>
  <div v-if="isTabActive(props.label)">
    <slot />
  </div>
</template>
