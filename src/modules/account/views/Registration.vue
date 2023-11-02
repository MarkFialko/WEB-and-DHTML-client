<template>
  <div class="container register-container">
    <div class="register-info">
      <p class="register-title">Регистрация аккаунта</p>
      <p class="register-subtitle">
        Делайте покупки быстро и удобно, отслеживайте статус заказа и получайте скидки.
      </p>
      <div class="register-bonuses">
        <div class="register-bonus" v-for="bonus in REGISTER_BONUSES" :key="bonus.title">
          <img class="register-bonus__icon" :src="bonus.icon" :alt="bonus.title" />
          <p class="register-bonus__title">{{ bonus.title }}</p>
          <span class="register-bonus__description">{{ bonus.description }}</span>
        </div>
      </div>
    </div>
    <form class="register-form">
      <AppInput label="Ваше имя и фаимилия" placeholder="Владимир Иванов" v-model="fullName" />
      <AppInput label="Электронная почта" placeholder="yourname@mail.com" v-model="email" />
      <div class="register-form__passwords">
        <AppInput
          type="password"
          label="Пароль для входа"
          placeholder="От 5 и более символов"
          v-model="password"
        />
        <AppInput
          type="password"
          label="Подтвердите пароль"
          placeholder="Повторите пароль"
          v-model="passwordRepeat"
        />
      </div>
      <span v-if="errorMessage !== null" class="text-error">{{ errorMessage }}</span>
      <AppButton :disabled="buttonDisabled" @click="registration">Создать аккаунт</AppButton>
      <p class="register-form__bottom">
        Уже есть профиль?
        <router-link class="register-form__link" :to="Routes.LOGIN">Войти в аккаунт</router-link>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AppInput from '@/shared/ui-kit/app-input/AppInput.vue'
import AppButton from '@/shared/ui-kit/app-button/AppButton.vue'

import giftIcon from '@/modules/account/icons/giftIcon.svg'
import garantyIcon from '@/modules/account/icons/garantyIcon.svg'
import paymentIcon from '@/modules/account/icons/paymentIcon.svg'
import { Routes } from '@/app/router/types'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const fullName = ref('')
const email = ref('')

const errorMessage = ref()

const password = ref('')
const passwordRepeat = ref('')

const buttonDisabled = computed(() => {
  const firstNameValid = fullName.value?.split(' ')[0]?.length >= 3
  const lastNameValid = fullName.value?.split(' ')[1]?.length >= 3
  const passwordValid = password.value.length > 4
  const passwordRepeatValid = password.value === passwordRepeat.value
  const emailValid = /\S+@\S+\.\S+/.test(email.value)

  return !firstNameValid || !lastNameValid || !passwordValid || !passwordRepeatValid || !emailValid
})

const REGISTER_BONUSES = [
  {
    title: 'Возвращаем 10% бонусами',
    description:
      'При заказе на сумму от 3500 руб. и весе до 3 кг. предоставляется бесплатная доставка по всей Россиию',
    icon: giftIcon
  },
  {
    title: 'Гарантия качества',
    description:
      'При заказе на сумму от 3500 руб. и весе до 3 кг. предоставляется бесплатная доставка по всей Россиию',
    icon: garantyIcon
  },
  {
    title: 'Удобные способы оплаты',
    description:
      'При заказе на сумму от 3500 руб. и весе до 3 кг. предоставляется бесплатная доставка по всей Россиию',
    icon: paymentIcon
  }
]

const registration = async () => {
  errorMessage.value = null

  try {
    const email_ = email.value
    const password_ = password.value
    const firstName = fullName.value.split(' ')[0]
    const lastName = fullName.value.split(' ')[1]

    const data = {
      email: email_,
      password: password_,
      firstName: firstName,
      lastName: lastName
    }
    const isSuccess = await store.dispatch('account/registration', data)

    router.push(`/${Routes.ACCOUNT}`)
  } catch (e) {
    errorMessage.value = e.response.data.message
  }
}
</script>

<style lang="scss">
.register-container {
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: $md) {
    grid-template-columns: 1fr;
  }

  .register-title {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 12px;
    @media (max-width: $md) {
      font-size: 24px;
    }
  }

  .register-subtitle {
    font-size: 16px;
    flex: 1 1 auto;
    margin-bottom: 40px;
  }

  .register-bonuses {
    display: flex;
    flex-direction: column;
    gap: 30px;
    @media (max-width: $md) {
      gap: 20px;
    }
  }

  .register-bonus {
  }

  .register-bonus__icon {
    margin-bottom: 8px;
  }

  .register-bonus__title {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  .register-bonus__description {
  }
}

.register-info {
  padding: 40px 55px;
  display: flex;
  flex-direction: column;
  background: rgba($accent-color, 0.2);
  @media (max-width: $lg) {
    padding: 20px;
  }
}

.register-form {
  background: #ffffff;
  padding: 40px 55px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: $lg) {
    padding: 20px;
  }

  &__passwords {
    display: flex;
    gap: 20px;
    width: 100%;
    flex: 1 1 auto;
    @media (max-width: $lg) {
      flex-direction: column;
    }
  }

  &__bottom {
    align-self: center;

    .register-form__link {
      color: $primary-color;
    }
  }
}
</style>
