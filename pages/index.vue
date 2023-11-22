<template>
  <div class="container">
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
    </div>
  </div>
</template>
