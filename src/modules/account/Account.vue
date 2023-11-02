<template>
  <div class="container account-container">
    <div class="account-activities">
      <AppButton @click="logout">Выйти</AppButton>
      <AppButton v-if="user?.roles.includes(Roles.WAITER)" type="link" :to="Routes.ORDERS"
        >История заказов
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/shared/ui-kit/app-button/AppButton.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Routes } from '@/app/router/types'
import { computed } from 'vue'
import { Roles } from '@/modules/account/account.types'

const store = useStore()
const router = useRouter()
const logout = async () => {
  await store.dispatch('account/logout')
  router.push('/')
}

const user = computed(() => store.getters['account/getUser'])
</script>

<style scoped lang="scss">
.account {
  &-container {
    width: 100%;
  }

  &-activities {
    display: flex;
    align-items: center;
    gap: 15px;
  }
}
</style>
