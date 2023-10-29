<template>
  <div class="app-header-bottom">
    <div class="app-header-bottom__container container">
      <nav class="app-header-bottom__nav nav-menu">
        <router-link
          v-for="navLink in MENU_ITEMS"
          :key="navLink.to"
          :to="navLink.to"
          class="nav-menu__link"
          >{{ navLink.name }}
        </router-link>
      </nav>
      <div class="nav-search">
        <SearchIcon class="search-icon" />
        <input
          class="nav-search__input"
          v-model="search"
          type="text"
          placeholder="Введите название блюда"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Routes } from '@/app/router/types'
import SearchIcon from '@/shared/icons/SearchIcon.vue'
import { ref } from 'vue'

const MENU_ITEMS = [
  {
    name: 'Меню',
    to: Routes.MENU
  }
]

const search = ref('')
</script>

<style lang="scss">
.app-header-bottom {
  padding: 10px 0;
  border-bottom: 1px solid rgba($accent-color,0.2);

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.nav-search {
  display: flex;
  align-items: center;
  gap: 8px;

  .search-icon {
    opacity: 0.6;
    transition: opacity 0.2s;
  }

  &:focus-within,
  &:hover {
    .search-icon {
      opacity: 1;
    }
  }

  &__input {
    border: none;
    font-size: 14px;
    width: 180px;
    background: transparent;

    &:focus {
      border: none;
      outline: none;
    }

    &:focus-within {
      &::placeholder {
        opacity: 0;
      }
    }

    &::placeholder {
      opacity: 0.6;
      color: $primary-text-color;
    }
  }
}
</style>
