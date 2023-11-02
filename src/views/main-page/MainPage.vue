<template>
  <div class='container main-page'>
    <div class='dishes-block'>
      <span v-if='loading'>Загрузка...</span>

      <template v-else>
        <span v-if='dishes.length === 0'>Не удалось получить меню :(</span>

        <template v-else>
          <DishCard
            v-for='dish in dishes'
            :key='dish.id'
            :name='dish.name'
            :price='dish.price'
            :description='dish.description'
            :id='dish._id'
            :image='dish.image'
          />
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang='ts'>
import DishCard from '@/shared/components/DishCard.vue'
import { onMounted, ref } from 'vue'
import { DishApi } from '@/api/Dish.api'

const loading = ref(false)

const dishes = ref([])

onMounted(() => {
  getDishes()
})

const getDishes = async () => {
  loading.value = true
  try {
    const response = await DishApi.getAll()

    dishes.value = response.data.dishes
  } catch (e) {
    dishes.value = []
  } finally {
    loading.value = false
  }
}
</script>

<style lang='scss'>
.dishes-block {
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
  gap: 16px;
}
</style>
