<template>
  <div class="container account-container">
    <span class="account-hello">Привет, {{ user?.firstName }} {{ user?.lastName }}!</span>
    <div class="account-activities">
      <AppButton @click="logout">Выйти</AppButton>
      <AppButton v-if="user?.roles.includes(Roles.WAITER)" type="link" :to="Routes.ORDERS"
        >Все заказы
      </AppButton>
      <AppButton v-if="user?.roles.includes(Roles.USER)" type='link' :to='Routes.MY_ORDERS'
      >Мои заказы
      </AppButton>
      <AppButton v-if="user?.roles.includes(Roles.ADMIN)" type="link" :to="Routes.USERS"
      >Пользователи
      </AppButton>
    </div>
    <div v-if="user?.roles.includes(Roles.ADMIN)">
      <div class="account-create-order">
        <p class="account-create-order__title">Добавить в меню новое блюдо</p>
        <AppInput v-model="dishName" label="Название блюда" placeholder="Введите название блюда" />
        <AppInput type="number" v-model="dishPrice" label="Цена блюда" placeholder="Введите цену" />
        <AppInput v-model="dishDescription" label="Описание блюда" placeholder="Введите описание" />
        <AppButton  @click='downloadImage'>Загрузить изображение</AppButton>

        <AppButton :loading='loading' @click="createDish" :disabled="dishCreateButtonDisabled"
          >Добавить блюдо в меню
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/shared/ui-kit/app-button/AppButton.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Routes } from '@/app/router/types'
import { computed, ref } from 'vue'
import { Roles } from '@/modules/account/account.types'
import AppInput from '@/shared/ui-kit/app-input/AppInput.vue'
import { DishApi } from '@/api/Dish.api'
import { OrderApi } from '@/api/Order.api'
import axiosInstance from '@/api'
import axios from 'axios'

const store = useStore()
const router = useRouter()
const logout = async () => {
  await store.dispatch('account/logout')
  router.push('/')
}

const dishName = ref('')
const dishPrice = ref(0)
const dishDescription = ref('')
const dishImage = ref('')

const loading = ref(false)

const dishCreateButtonDisabled = computed(() => {
  const imageValid = dishImage.value.length > 0
  return dishName.value.length < 5 || dishPrice.value < 1 || dishDescription.value.length < 15 || !imageValid
})

const createDish = async () => {
  loading.value = true
  const data = {
    name: dishName.value,
    price: dishPrice.value,
    description: dishDescription.value,
    image: dishImage.value
  }

  await DishApi.create(data)

  dishName.value = ''
  dishPrice.value = 0
  dishDescription.value = ''

  loading.value = false
}

const downloadImage = async () => {
  const file = await new Promise((resolve) => {
    const input = document.createElement('input')

    input.accept = 'image/png, image/jpeg, image/jpg, image/heic'
    input.type = 'file'
    input.multiple = false

    input.onchange = () => {
      const files = Array.from(input.files)
      resolve(files[0])
    }

    input.click()
  })
  if (file != null) {
    const formData = new FormData()
    formData.append('image',file as Blob)
    const endLength =import.meta.env.VITE_API_URL.length - 5
    const { data } = await  axios.post(`${import.meta.env.VITE_API_URL.substring(0,endLength)}/upload`,formData)
    console.log(data,'data')
    dishImage.value = `${import.meta.env.VITE_API_URL.substring(0,endLength)}${data.url}`
    console.log(dishImage.value,'dishimage')
  }
}


const user = computed(() => store.getters['account/getUser'])
</script>

<style scoped lang="scss">
.account {
  &-container {
    width: 100%;
  }

  &-create-order {
    background: #ffffff;
    padding: 15px;
    border-radius: 4px;
    margin-top: 20px;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    &__title {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 15px;
    }
  }

  &-hello {
    font-size: 30px;
    display: inline-block;
    margin-bottom: 20px;
  }

  &-activities {
    display: flex;
    align-items: center;
    gap: 15px;
  }
}
</style>
