import './assets/main.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VDateInput } from 'vuetify/labs/VDateInput'
import '@mdi/font/css/materialdesignicons.css'
const vuetify = createVuetify({
  components: {
    ...components,
    VDateInput
  },
  directives
})

import { createPinia } from 'pinia'
const pinia = createPinia()

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import router from './router'
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

app.use(createPinia())
// 路由器
app.use(router)
// vuetify组件
app.use(vuetify)
// 吐司通知
app.use(Toast)
// 状态管理框架
app.use(pinia)
app.mount('#app')
