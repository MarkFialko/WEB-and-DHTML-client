<template>
  <component :is="resolveLayout as string">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Layouts } from '@/layouts/layouts.types'
import BlankLayout from '@/layouts/BlankLayout.vue'
import AccountLayout from '@/layouts/AccountLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'

const route = useRoute()

const resolveLayout = computed(() => {
  if (route.meta.layout === Layouts.BLANK) {
    return BlankLayout
  }
  if (route.meta.layout === Layouts.ACCOUNT) {
    return AccountLayout
  }

  return AppLayout
})
</script>

<style lang="scss"></style>
