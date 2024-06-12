import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import "primevue/resources/themes/aura-light-noir/theme.css";
import "primeflex/primeflex.css"

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.mount('#app')
