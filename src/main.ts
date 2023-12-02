
import '@/assets/js/layout.js'

import '@/assets/css/bootstrap.min.css'
import '@/assets/css/icons.css'

import '@/assets/css/app.min.css'
import '@/assets/css/custom.css'

import '@/assets/js/vendor/bootstrap.bundle.min.js'
import '@/assets/js/vendor/simplebar.min.js'
import '@/assets/js/plugins.js'
// import '@/assets/js/app.js'


import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
