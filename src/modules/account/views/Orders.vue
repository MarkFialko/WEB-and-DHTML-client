<template>
  <div class="orders container">
    <span v-if="loading">Загрузка...</span>
    <template v-else>
      <span v-if="orders.length === 0 && !loading">Заказов пока нет :(</span>
      <template v-else>
        <p class="orders__all">Все заказы:</p>
        <div class="orders__content">
          <OrderCard
            @update-orders="getOrders"
            v-for="(order, i) in orders"
            :key="i"
            :order="order"
          />
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { OrderApi } from '@/api/Order.api'
import OrderCard from '@/modules/account/components/OrderCard.vue'

const orders = ref([])
const loading = ref(false)
onMounted(async () => {
  await getOrders()
})

const getOrders = async () => {
  try {
    loading.value = true
    const data = await OrderApi.getAllOrders()
    console.log(data.data[0])
    orders.value = data.data
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.orders {
  &__all {
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 15px;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    @media (max-width: $lg) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: $md) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: $tn) {
      grid-template-columns: 1fr;
    }
    gap: 10px;
  }
}
</style>
