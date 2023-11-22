<script setup lang="ts">
const props = withDefaults(defineProps<{
  items: { label: string, to?: string }[]
  separatorIcon?: string
}>(), {
  separatorIcon: 'ion:chevron-forward-outline',
})

const breadcrumbs = computed(() => {
  return props.items.map((item, index) => {
    return {
      ...item,
      isLast: index === props.items.length - 1,
    }
  })
})
</script>

<template>
  <nav aria-label="Breadcrumb" class="breadcrumb">
    <ol class="flex">
      <li
        v-for="(item, index) in breadcrumbs" :key="index"
        class="inline-flex items-center"
      >
        <NuxtLink
          :to="item.to"
          class="breadcrumb__link"
          :class="{ 'breadcrumb__link--current': item.isLast }"
        >
          {{ item.label }}
        </NuxtLink>
        <Icon
          v-if="!item.isLast"
          :name="props.separatorIcon"
          class="breadcrumb__separator"
        />
      </li>
    </ol>
  </nav>
</template>

<style lang="postcss" scoped>
.breadcrumb {
  &__separator {
    @apply mx-px;
    @apply text-neutral-500;
  }

  &__link {
    @apply text-sm text-neutral-500 transition-colors;
    &:hover {
      &:not(.breadcrumb__link--current) {
        @apply text-neutral-700;
      }
    }
    &--current {
      @apply text-neutral-700;
    }
  }
}
</style>
