<template>
  <div class="wrapper app-layout">
    <AppHeader />
    <main class="main">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/widgets/app-header/AppHeader.vue'
import AppFooter from '@/widgets/AppFooter.vue'
</script>

<style lang="scss">
.app-layout {
  main {
    margin-top: 20px;
  }
}
</style>
