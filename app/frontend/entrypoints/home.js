import { createApp } from 'vue/dist/vue.esm-bundler';  
import Home from '../components/Home.vue';
import LocationTable from '../components/home/LocationTable.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import pinia from '../store/index.js';
import { createI18n } from "vue-i18n";
import zh from "../locales/zh-TW.json";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    "zh-TW": zh,
    "en": en,
    "fr": fr
  },
});

let element = document.querySelector('#app');
let railsProps = JSON.parse(element.dataset.railsdata)
// console.log(railsProps);
const app = createApp(Home, railsProps);

app.use(ElementPlus);
app.use(pinia);
app.use(i18n);
app.component('LocationTable', LocationTable);
app.mount('#app');
