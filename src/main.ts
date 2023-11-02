import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import '@/shared/styles/styles.scss'

import App from '@/app/App.vue'
import router from '@/app/router'
import store from '@/app/store'

const app = createApp(App)

// app.use(createPinia())
app.use(router)
app.use(store)
app.mount('#app')
