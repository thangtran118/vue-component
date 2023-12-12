<script setup lang="ts">
const tabLabels: string[] = useSlots().default?.().map(slot => slot.props?.label) ?? []
const activeTab = ref()

const isTabActive = (tabLabel: string): boolean => activeTab.value === tabLabel

const tabLabelElements = ref<HTMLElement[]>([])
const indicatorWidth = ref<number>(0)
const indicatorPositionLeft = ref<number>(0)

function updateActiveTab(label: string) {
  activeTab.value = label
  const activeTabElement = tabLabelElements.value.find(element => element.textContent === label)

  indicatorPositionLeft.value = activeTabElement?.offsetLeft ?? 0
  indicatorWidth.value = activeTabElement?.offsetWidth ?? 0
}

onMounted(() => {
  updateActiveTab(tabLabels[0])
})

provide('isTabActive', isTabActive)
</script>

<template>
  <div class="tabview-wrapper">
    <div class="tabview-nav-wrapper">
      <ul class="tabview-nav-list">
        <li
          v-for="tab in tabLabels" :key="tab"
          ref="tabLabelElements"
          class="tabview-nav-item"
          :class="{ 'is-active': isTabActive(tab) }"
          @click="updateActiveTab(tab)"
        >
          {{ tab }}
        </li>
      </ul>
      <div class="tabview-indicator" :style="{ width: `${indicatorWidth}px`, left: `${indicatorPositionLeft}px` }" />
    </div>
    <div class="tabview-content-wrapper">
      <slot />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.tabview-wrapper {
  .tabview-nav-wrapper {
    @apply relative;

     .tabview-nav-list {
       @apply flex;
       @apply border-b border-neutral-200;

       .tabview-nav-item {
         @apply cursor-pointer;
         @apply px-4 py-3 font-bold;
         @apply transition-all;

         &:hover,
         &.is-active {
           @apply text-primary;
         }
       }
     }

    .tabview-indicator {
      @apply absolute bottom-0 left-0;
      @apply h-px bg-primary;
      @apply transition-all;
    }
  }
  .tabview-content-wrapper {
    @apply px-4 py-3;
  }
}
</style>
