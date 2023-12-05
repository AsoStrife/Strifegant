import '@/assets/css/app.css'
import '@/assets/css/font-awesome.min.css'

import '@/assets/js/app.js'
import '@/assets/js/font-awesome.min.js'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
