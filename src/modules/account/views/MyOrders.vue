<template>
  <div class="container my-orders">
    <h1 class="my-orders__title">История заказов</h1>
    <template v-if='loading'>
      <span>Загрузка...</span>
    </template>
    <template v-else>
    <span v-if='orders.length === 0'>
      Вы еще ни разу не делали заказ
    </span>
    <div v-else class="my-orders__content">
      <OrderCard v-for="(order, i) in orders" :key="i" :order="order" />
    </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { OrderApi } from '@/api/Order.api'
import OrderCard from '@/modules/account/components/OrderCard.vue'

const orders = ref([])

const loading = ref(false)

onMounted(() => {
  getOrders()
})

const getOrders = async () => {
  loading.value = true
  const response = await OrderApi.getMyOrders()
  orders.value = response.data
  loading.value = false
}
</script>

<style scoped lang="scss">
.my-orders {
  &__title {
    font-size: 25px;
    margin-bottom: 20px;
  }

  &__content {
    display: grid;
    gap: 15px;
    grid-template-columns: 1fr 1fr 1fr;
    @media (max-width: $lg) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: $md) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
