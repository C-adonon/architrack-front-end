import "./assets/main.scss";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import "primevue/resources/themes/aura-light-noir/theme.css";
import "primeflex/primeflex.css";
import ToastService from "primevue/toastservice";
import historyApiFallback from "connect-history-api-fallback";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

// test history fallback
app.use(historyApiFallback()); 

app.mount("#app");
