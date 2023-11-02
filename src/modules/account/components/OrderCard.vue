<template>
  <div class="order-card">
    <p class="order-card__id">Номер заказа: №{{ order.id }}</p>
    <div class="order-card__dishes">
      <div class="order-card__dish" v-for="dish in order.dishes" :key="dish.id">
        {{ dish.name }}
      </div>
    </div>
    <p class="order-card__status">Статус: {{ order.status }}</p>
    <AppButton @click='completeOrder' v-if="user?.roles.includes(Roles.WAITER) && order.status !== 'Завершён'">Выполнить заказ</AppButton>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'
import { Roles } from '@/modules/account/account.types'
import AppButton from '@/shared/ui-kit/app-button/AppButton.vue'
import { OrderApi } from '@/api/Order.api'

interface Props {
  order: any
}

const store = useStore()

const props = defineProps<Props>()

const user = computed(() => store.getters['account/getUser'])

const completeOrder = async () => {
const response = await OrderApi.completeOrder(props.order.id)
}

</script>

<style scoped lang="scss">
.order-card {
  padding: 15px 20px;
  border: 1px solid $primary-color;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__dishes {
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex: 1 1 auto;
  }

  &__dish {
    border: 1px solid #000000;
    border-radius: 4px;
    padding: 10px;
  }

  &__status {
    margin-top: 20px;
    padding: 5px;
    text-align: center;
    border: 5px solid $accent-color;
  }
}
</style>
