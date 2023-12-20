import { createApp } from 'vue/dist/vue.esm-bundler';  
import Home from '../components/Home.vue';
import LocationTable from '../components/home/LocationTable.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import pinia from '../store/index.js';

const app = createApp(Home);

app.use(ElementPlus);
app.use(pinia);
app.component('LocationTable', LocationTable);
app.mount('#app');
