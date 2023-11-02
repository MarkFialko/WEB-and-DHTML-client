<template>
  <div class="container account-container">
    <div class="account-activities">
      <AppButton @click="logout">Выйти</AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/shared/ui-kit/app-button/AppButton.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const logout = async () => {
  await store.dispatch('account/logout')
  router.push('/')
}
</script>

<style scoped lang="scss">
.account {
  &-container {
    width: 100%;
  }

  &-activities {
  }
}
</style>
