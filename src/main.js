import './assets/main.css';

//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from "pinia";

const app = createApp(App);
app.use( createPinia() );
app.mount('#app')
