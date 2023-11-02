<template>
  <div class="app-header-top">
    <div class="container app-header-top__container">
      <div class="work-times">
        <ClockIcon />
        <p @click='h' class="work-times_schedule">Пн-Пт 9:00 - 19:00</p>
      </div>
      <AppUserMenu/>
    </div>
  </div>
</template>

<script setup lang="ts">
import ClockIcon from '@/widgets/app-header/icons/ClockIcon.vue'
import UserIcon from '@/widgets/app-header/icons/UserIcon.vue'
import { Routes } from '@/app/router/types'
import { useStore } from 'vuex'
import { computed } from 'vue'
import Spinner from '@/shared/components/Spinner.vue'
import AppUserMenu from '@/widgets/app-user-menu/AppUserMenu.vue'


</script>

<style lang="scss">
.app-header-top {
  padding: 10px 0;

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.work-times {
  display: flex;
  align-items: center;
  gap: 4px;

  &_schedule {
    font-size: 14px;
  }
}

.user-activities {
  display: flex;
  gap: 4px;

  align-items: center;

  &__enter {
    font-size: 14px;
  }
}
</style>
