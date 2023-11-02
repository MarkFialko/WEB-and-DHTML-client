import type { IUser } from '@/modules/account/account.types'
import { UserApi } from '@/api/User.api'
import { BasketApi } from '@/api/Basket.api'

interface State {
  isAuth: boolean
  isLoading: boolean
  user: IUser | null
  basket: any
}

const account = {
  state(): State {
    return {
      isLoading: false,
      user: null,
      isAuth: false,
      basket: null
    }
  },

  getters: {
    getIsLoading(state: State) {
      return state.isLoading
    },
    getUser(state: State) {
      return state.user
    },
    getIsAuth(state: State) {
      return state.isAuth
    },
    getBasket(state: State) {
      return state.basket
    }
  },

  mutations: {
    setIsLoading(state: State, isLoading: boolean) {
      state.isLoading = isLoading
    },
    setIsAuth(state: State, isAuth: boolean) {
      state.isAuth = isAuth
    },
    setUser(state: State, user: IUser) {
      state.user = user
    },
    setBasket(state: State, basket: basket) {
      state.basket = basket
    }
  },

  actions: {
    async getMe({ commit, state }) {
      try {
        commit('setIsLoading', true)
        console.log('getMEEE')
        const { data: user } = await UserApi.getMe()
        console.log('BASKETTTT')
        const {data:basket} = await BasketApi.getAll()
        commit('setBasket',basket)
        commit('setIsAuth', true)
        commit('setUser', user)
        return Promise.resolve()
      } catch (e) {
        commit('setIsAuth', false)
        return Promise.reject(e)
      } finally {
        commit('setIsLoading', false)
      }
    },

    async registration({ commit, state }, data: any) {
      try {
        const { email, password, firstName, lastName } = data
        const { accessToken } = await UserApi.registration(email, password, firstName, lastName)

        localStorage.setItem('token', accessToken)

        return Promise.resolve()
      } catch (e) {
        return Promise.reject(e)
      }
    },

    async login({ commit, state }, data: any) {
      try {
        const { email, password } = data
        const { data: userData } = await UserApi.login(email, password)

        commit('setUser', userData.user as IUser)
        commit('setIsAuth', true)
        localStorage.setItem('token', userData.accessToken)

        return Promise.resolve()
      } catch (e) {
        return Promise.reject(e)
      }
    },

    async logout({ commit, state }) {
      try {
        localStorage.removeItem('token')
        const isSuccess = await UserApi.logout()

        commit('setUser', null)
        commit('setIsAuth', false)
        return Promise.resolve(isSuccess)
      } catch (e) {
        return Promise.reject(e)
      }
    }
  },

  namespaced: true
}

export default account
