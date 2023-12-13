
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/index'

import axios from 'axios'
import { Toast } from 'vant';
import 'vant/lib/index.css';

const app = createApp(App)
app.use(Toast);
app.use(createPinia())
app.use(router)
app.provide('$axios', axios)
app.mount('#app')
