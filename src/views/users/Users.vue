<template>
  <div class="container users-page">
    <h1 class="users-page__title">Пользователи</h1>

    <span v-if="loading">Загрузка...</span>

    <div v-else class="users-page__content">
      <div v-for="user in users" :key="user.id" class="users-page__user user-card">
        <p class="user-card__fullName">Фамилия Имя: {{ user.firstName }} {{ user.lastName }}</p>
        <p class="user-card__id">ID: {{ user.id }}</p>
        <div class="user-card__roles">
          <p class="user-card__roles_title">Роли:</p>
          <div class="user-card__role" v-for="role in user.roles" :key="role">
            <span>{{ role }}</span>
            <AppButton @click="deleteRole(user.id, role)" v-if="role !== Roles.USER"
              >Убрать с должности
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { UserApi } from '@/api/User.api'
import type { IUser } from '@/modules/account/account.types'
import { Roles } from '@/modules/account/account.types'
import AppButton from '@/shared/ui-kit/app-button/AppButton.vue'

const loading = ref(false)
const users = ref<IUser[]>([])

onMounted(() => {
  getUsers()
})

const getUsers = async () => {
  try {
    const response = await UserApi.getUsers()
    users.value = response.data
  } catch (e) {
    users.value = []
  } finally {
    loading.value = false
  }
}

const deleteRole = async (userId: string, role: Roles) => {
  await UserApi.deleteRole(userId, role)
  await getUsers()
}
</script>

<style lang="scss">
.users-page {
  &__title {
    font-size: 25px;
    font-weight: 500;
  }

  &__content {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: $lg) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: $tn) {
      grid-template-columns: 1fr;
    }
    gap: 15px;
  }

  &__user {
    padding: 15px;
    border: 1px solid #000000;
  }
}

.user-card {
  display: flex;
  width: 100%;
  flex-direction: column;

  gap: 10px;

  &__fullName {
  }

  &__id {
  }

  &__roles {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &_title {
      font-weight: 500;
      font-size: 18px;
    }
  }

  &__role {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
  }
}
</style>
