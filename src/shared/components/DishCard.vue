<template>
  <div class="dish-card">
    <div class="dish-card__image">
      <img v-if="image" :src="image" :alt="name" />
      <div v-else class="dish-card__image_empty"></div>
    </div>
    <div class="dish-card__info">
      <p class="dish-card__title">{{ name }}</p>
      <div class="dish-card__actions">
        <p class="dish-card__price">
          <span>{{ price }}</span> ₽
        </p>
        <AppButton v-if="isAuth" :disabled="loading" @click="addToCart" class="dish-card__button"
          >В корзину
        </AppButton>
        <AppButton type="link" v-else :to="Routes.LOGIN">Войти</AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/shared/ui-kit/app-button/AppButton.vue'
import { computed, ref } from 'vue'
import { BasketApi } from '@/api/Basket.api'
import { useStore } from 'vuex'
import { Routes } from '@/app/router/types'

interface Props {
  name: string
  price: number
  description: string
  image: string
  id: string
}

const props = defineProps<Props>()
const store = useStore()
const loading = ref(false)

const isAuth = computed(() => store.getters['account/getIsAuth'])

const addToCart = async () => {
  loading.value = true
  const { data: newBasket } = await BasketApi.add([props.id])
  store.commit('account/setBasket', newBasket)
  loading.value = false
}
</script>

<style lang="scss">
.dish-card {
  max-width: 340px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba($primary-text-color, 0.2);
  border-radius: 12px;
  gap: 15px;
  overflow: hidden;
  @media (max-width: $tn) {
    max-width: none;
  }

  &__image {
    height: 264px;
    position: relative;
    overflow: hidden;

    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    &_empty {
      width: 100%;
      height: 100%;
      background: rgba($primary-text-color, 0.8);
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 15px;
  }

  &__title {
    font-size: 18px;
    font-weight: 500;
  }

  &__actions {
    display: flex;
    gap: 8px;
    width: 100%;
    justify-content: space-between;
    @media (max-width: $tn) {
      flex-direction: column;
    }
  }

  &__price {
    font-size: 16px;
    font-weight: 400;

    span {
      font-weight: 700;
    }
  }

  &__button {
    min-width: 140px;
  }
}
</style>
