<template>
  <div class="container login-container">
    <form @submit='login' class="login-form">
      <p class="login-form__title">Постоянный покупатель</p>
      <AppInput label="Электронная почта" placeholder="yourname@mail.com" v-model="email" />
      <AppInput type='password' label="Ваш пароль" placeholder="От 5 и более символов" v-model="password" />
      <AppButton @click="login">Войти</AppButton>
    </form>
    <div class="login-info">
      <div class="login-info__container">
        <p class="login-title">Создайте аккаунт</p>
        <p class="login-subtitle">
          Делайте покупки быстро и удобно, отслеживайте статус заказа и получайте скидки.
        </p>
        <AppButton
          class="login-info__button"
          variant="outline"
          type="link"
          :to="Routes.REGISTRATION"
          >Зарегистрироваться
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppInput from '@/shared/ui-kit/app-input/AppInput.vue'
import AppButton from '@/shared/ui-kit/app-button/AppButton.vue'
import { Routes } from '@/app/router/types'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()
const email = ref('')

const password = ref('')

const login = async () => {
  store
    .dispatch('account/login', {
      email: email.value,
      password: password.value
    })
    .then(() => {
      router.push(`/${Routes.ACCOUNT}`)
    })
}
</script>

<style lang="scss">
.login-container {
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: $md) {
    grid-template-columns: 1fr;
  }

  .login-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 12px;
    @media (max-width: $md) {
      font-size: 24px;
    }
  }

  .login-subtitle {
    font-size: 16px;
    flex: 1 1 auto;
    margin-bottom: 40px;
  }

  .login-bonuses {
    display: flex;
    flex-direction: column;
    gap: 30px;
    @media (max-width: $md) {
      gap: 20px;
    }
  }
}

.login-info {
  padding: 40px 55px;
  display: flex;
  flex-direction: column;
  background: rgba($accent-color, 0.2);
  align-items: center;
  justify-content: center;
  text-align: center;
  @media (max-width: $lg) {
    padding: 20px;
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__button {
    width: 100%;
    max-width: 260px;
  }
}

.login-form {
  background: #ffffff;
  padding: 40px 55px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: $lg) {
    padding: 20px;
  }

  &__title {
    text-align: center;
    margin-bottom: 80px;
    font-size: 28px;
    font-weight: 700;
    @media (max-width: $md) {
      margin-bottom: 20px;
      font-size: 24px;
    }
  }
}
</style>
