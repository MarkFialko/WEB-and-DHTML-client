<template>
  <div class="container shopping-cart-container">
    <div v-if="basket.dishes.length === 0">Тут пусто :( Добавьте товары в корзину</div>
    <div v-else class="shopping-cart-dishes">
      <div class="shopping-cart-dish" v-for="{ dish, count } in basket.dishes">
        <img :src="dish.image" :alt="dish.name" />
        <h3 class="shopping-cart-dish__title">{{ dish.name }}</h3>
        <div>Цена: {{ dish.price }}</div>
        <p>Описание: {{ dish.description }}</p>
        <div class="shopping-cart-dish__activities">
          <div
            @click="add(dish.id)"
            :class="{ disabled: loading || createOrderLoading }"
            class="plus"
          >
            +
          </div>
          <div class="count">{{ count }}</div>
          <div
            @click="remove(dish.id)"
            :class="{ disabled: loading || createOrderLoading }"
            class="minus"
          >
            -
          </div>
        </div>
      </div>
    </div>
    <AppButton
      class="shopping-cart__order"
      :disabled="createOrderLoading"
      v-if="basket.dishes.length > 0"
      @click="createOrder"
      >Сделать заказ
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { BasketApi } from '@/api/Basket.api'
import AppButton from '@/shared/ui-kit/app-button/AppButton.vue'
import { OrderApi } from '@/api/Order.api'

const store = useStore()
const basket = computed(() => store.getters['account/getBasket'])

const createOrderLoading = ref(false)

const loading = ref(false)

const add = async (id: string) => {
  loading.value = true
  const { data: newBasket } = await BasketApi.add([id])
  store.commit('account/setBasket', newBasket)
  loading.value = false
}

const remove = async (id: string) => {
  loading.value = true
  const { data: newBasket } = await BasketApi.remove([id])
  store.commit('account/setBasket', newBasket)
  loading.value = false
}

const createOrder = async () => {
  createOrderLoading.value = true
  await OrderApi.createOrder()
  await store.dispatch('account/getMe')
  createOrderLoading.value = false
}
</script>

<style lang="scss">
.shopping-cart {
  &__order {
    width: 100%;
    margin-top: 20px;
  }

  &-container {
    width: 100%;
  }

  &-dish {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid $primary-color;
    display: flex;
    flex-direction: column;
    gap: 10px;

    &__title {
    }

    &__activities {
      margin-top: 15px;
      align-items: center;
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      justify-content: center;
      place-items: center;

      .plus {
        background: $primary-color;
      }

      .plus,
      .minus {
        cursor: pointer;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;

        &.disabled {
          pointer-events: none;
          opacity: 0.5;
        }
      }

      .minus {
        background: $accent-color;
      }
    }
  }

  &-dishes {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
  }
}
</style>
