<template>
  <div class="app-header-top__activities">
    <Spinner v-if="loading" />

    <template v-else>
      <router-link v-if="!isAuth" :to="Routes.LOGIN" class="user-activities">
        <UserIcon />
        <p class="user-activities__enter">Войти в аккаунт</p>
      </router-link>
      <router-link v-if="user" :to="Routes.ACCOUNT">{{ user.email }}</router-link>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Routes } from '@/app/router/types'
import Spinner from '@/shared/components/Spinner.vue'
import UserIcon from '@/widgets/app-header/icons/UserIcon.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const loading = computed(() => store.getters['account/getIsLoading'])

const user = computed(() => store.getters['account/getUser'])

const isAuth = computed(() => store.getters['account/getIsAuth'])
</script>

<style scoped lang="scss"></style>
