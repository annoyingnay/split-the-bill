import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js"
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css"

const pinia = createPinia()

createApp(App).use(router).use(pinia).use(Antd).mount('#app')
