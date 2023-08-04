import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js"
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css"

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
  })

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(Antd).use(vuetify, {
  iconfont: 'mdi'
}).mount('#app')
