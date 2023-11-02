<template>
  <component :is="resolveLayout as string">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </component>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { Layouts } from '@/layouts/layouts.types'
import BlankLayout from '@/layouts/BlankLayout.vue'
import AccountLayout from '@/layouts/AccountLayout.vue'
import AppLayout from '@/layouts/AppLayout.vue'
import { useStore } from 'vuex'
import { BasketApi } from '@/api/Basket.api'

const route = useRoute()
const store = useStore()

const resolveLayout = computed(() => {
  if (route.meta.layout === Layouts.BLANK) {
    return BlankLayout
  }
  if (route.meta.layout === Layouts.ACCOUNT) {
    return AccountLayout
  }

  return AppLayout
})

onBeforeMount(()=> {
  store.dispatch('account/getMe')

})

</script>

<style lang="scss"></style>
