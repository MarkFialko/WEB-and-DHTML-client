<template>
  <div class="order-card">
    <div class="order-card__dishes">
      <div class="order-card__dish" v-for="{ dish, count } in order.dishes" :key="dish.id">
        {{ dish.name }} {{ count }}шт
      </div>
    </div>
    <p class="order-card__status">Статус: {{ order.status }}</p>
    <AppButton
      :loading="loading"
      @click="completeOrder"
      v-if="user?.roles.includes(Roles.WAITER) && order.status !== 'Завершён'"
      >Выполнить заказ
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { Roles } from '@/modules/account/account.types'
import AppButton from '@/shared/ui-kit/app-button/AppButton.vue'
import { OrderApi } from '@/api/Order.api'

interface Props {
  order: any
}

interface Emits {
  (e: 'update-orders'): void
}

const loading = ref(false)

const store = useStore()

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const user = computed(() => store.getters['account/getUser'])

const completeOrder = async () => {
  loading.value = true
  await OrderApi.completeOrder(props.order.order)
  emits('update-orders')
  loading.value = false
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
