<template>
  <button
    v-bind="$attrs"
    v-if="type === 'button'"
    @click.prevent
    class="app-button"
    :class="[variant,loading || disabled? 'disabled' : '']"
  >
    <template v-if="loading">
      <Spinner />
    </template>
    <template v-else>
      <slot />
    </template>
  </button>
  <router-link
    v-bind="$attrs"
    v-if="type === 'link'"
    :to="to"
    class="app-button"
    :class="[variant,loading || disabled? 'disabled' : '']"
  >
    <template v-if="loading">
      <Spinner />
    </template>
    <template v-else>
      <slot />
    </template>
  </router-link>
</template>

<script setup lang="ts">
import Spinner from '@/shared/components/Spinner.vue'

interface Props {
  type: 'link' | 'button'
  to?: string
  variant: 'common' | 'outline'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'common',
  disabled: false,
  loading: false
})
</script>

<style lang="scss">
.app-button {
  cursor: pointer;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: $primary-color;
  color: #ffffff;
  border: none;

  &.disabled {
    background: rgba($primary-color, 0.5);
    pointer-events: none;
    cursor: default;
  }

  &.outline {
    background: transparent;
    border: 1px solid $primary-color;
    color: $primary-color;

    &.disabled {
      background: transparent;
      border: 1px solid rgba($primary-color, 0.5);
    }
  }
}
</style>
