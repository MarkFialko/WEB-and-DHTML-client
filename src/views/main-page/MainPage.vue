<template>
  <div class="container main-page">
    <div class="dishes-block">
      <DishCard />
      <DishCard />
      <DishCard />
      <DishCard />
      <DishCard />
    </div>
  </div>
</template>

<script setup lang="ts">
import DishCard from '@/shared/components/DishCard.vue'
</script>

<style lang="scss">
.dishes-block {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
}
</style>
