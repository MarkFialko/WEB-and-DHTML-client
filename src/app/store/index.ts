// @ts-ignore
import { createStore } from 'vuex'
import account from '@/modules/account/store'

const store = createStore({
  modules: {
    account
  }
})

export default store
