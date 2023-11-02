<template>
  <div class="container main-page">
    <div class="dishes-block">
      <DishCard v-for='dish in dishes' :key='dish.id'
                :name='dish.name'
                :price='dish.price'
                :description='dish.description'
                :id='dish._id'
      />

    </div>
  </div>
</template>

<script setup lang="ts">
import DishCard from '@/shared/components/DishCard.vue'
import { onMounted, ref } from 'vue'
import { DishApi } from '@/api/Dish.api'

const loading = ref(false)

const dishes = ref([])

onMounted(()=> {
  getDishes()
})

const getDishes = async () => {
  loading.value = true
  try {
      const response = await DishApi.getAll()
    console.log(response.dishes)
    dishes.value = response.dishes
  } catch (e) {

  }
}

</script>

<style lang="scss">
.dishes-block {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;
}
</style>
