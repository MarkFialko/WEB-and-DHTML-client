<template>
  <div class="wrapper blank-layout">
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
.blank-layout {
  main {
    margin-top: 40px;
  }
}
</style>
