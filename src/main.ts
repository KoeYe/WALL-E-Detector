import { createApp } from 'vue'
import App from './App.vue'
import ArcoVue from '@arco-design/web-vue';
import './assets/main.css'
import '@arco-design/web-vue/dist/arco.css';

const app = createApp(App).use(ArcoVue).mount('#app')
