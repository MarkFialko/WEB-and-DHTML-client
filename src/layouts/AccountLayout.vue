<template>
  <div class="wrapper account-layout">
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
.account-layout {
  main {
    margin-top: 20px;
  }
}
</style>
