<template>
  <div class="container wrapper">
    <AppHeader />
    <main class='main'>
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/widgets/AppHeader.vue'
import AppFooter from '@/widgets/AppFooter.vue'
</script>

<style lang="scss">

</style>
