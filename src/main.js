import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import i18n from '@/lang/'
createApp(App).use(i18n).use(router).mount('#app')
