<script lang="ts" setup>
// Modal component
const showModal = ref(false)
</script>

<template>
  <div class="container">
    <!-- Start Breadcrumb -->
    <div>
      <h1>1. Breadcrumb</h1>
      <div>
        <Breadcrumb
          :items="[
            { label: 'Home', to: '/' },
            { label: 'iPhone', to: '/' },
            { label: 'iPhone 15 Series' },
          ]"
        />
      </div>
      <!-- End Breadcrumb -->

      <!-- Start Dialog -->
      <h1>2. Dialog</h1>
      <div>
        <button @click="showModal = true">
          Show Modal
        </button>
        <Dialog v-model:visible="showModal" title="Dialog Header">
          <p>Dialog content</p>
        </Dialog>
      <!-- End Dialog -->
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
body {
  @apply text-neutral-700;
}
</style>
