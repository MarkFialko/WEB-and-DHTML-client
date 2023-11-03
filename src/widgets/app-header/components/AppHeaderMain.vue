<template>
  <div class="app-header-main">
    <div class="container app-header-main__container">
      <Logo />
      <router-link v-if="isAuth" :to="Routes.SHOPPING_CART" class="user-basket">
        <div class="user-basket__info">
          <p class="user-basket__text">Ваша корзина</p>
          <span class="user-basket__sum">{{ basket?.price }} руб.</span>
        </div>
        <CartIcon />
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/shared/components/Logo.vue'
import CartIcon from '@/widgets/app-header/icons/CartIcon.vue'
import { Routes } from '@/app/router/types'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const basket = computed(() => store.getters['account/getBasket'])
const user = computed(() => store.getters['account/getUser'])
const isAuth = computed(() => store.getters['account/getIsAuth'])
</script>

<style lang="scss">
.app-header-main {
  padding: 10px 0;
  border-top: 1px solid rgba($accent-color, 0.2);
  border-bottom: 1px solid rgba($accent-color, 0.2);

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.user-basket {
  display: flex;
  align-items: center;
  gap: 8px;

  &__info {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    gap: 4px;
    align-items: flex-end;
  }

  &__text {
  }

  &__sum {
    font-weight: 700;
    color: $primary-color;
  }
}
</style>
