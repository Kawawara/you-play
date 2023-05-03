import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const app = createApp(App)

app.use(router)

app.use(Toast);

app.mount('#app')