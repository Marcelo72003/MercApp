import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './style.css';

// Funcion que inicializa la aplicacion Vue y registra el enrutador principal.
createApp(App).use(router).mount('#app');
