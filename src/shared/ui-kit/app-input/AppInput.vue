<template>
  <div class="app-input">
    <label class="app-inout__label">{{ label }}</label>
    <input
      class="app-input__input"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder: string
  label: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const handleInput = (event: InputEvent) => {
  emits('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style lang="scss">
.app-input {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  &__label {
    font-size: 16px;
  }

  &__input {
    border: 1px solid $primary-white;
    height: 48px;
    border-radius: 6px;
    padding: 0 14px;
    width: 100%;

    &:focus {
      outline: none;
    }

    &:focus-within {
      &::placeholder {
        opacity: 0;
      }
    }

    &::placeholder {
      color: #bfbfbf;
    }
  }
}
</style>
