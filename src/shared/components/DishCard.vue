<template>
  <div class="dish-card">
    <div class="dish-card__image">
      <img v-if="image" :src="image" :alt="title" />
      <div v-else class="dish-card__image_empty"></div>
    </div>
    <div class="dish-card__info">
      <p class="dish-card__title">{{ title }}</p>
      <div class="dish-card__actions">
        <p class="dish-card__price">
          <span>{{ price }}</span> ₽
        </p>
        <AppButton class="dish-card__button">В корзину</AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from '@/shared/ui-kit/app-button/AppButton.vue'

interface Props {
  title: string
  price: number
  image: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Сырный крем-суп',
  price: 299,
  image: ''
})
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

  &__image {
    height: 264px;

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
