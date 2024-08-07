import { createApp } from 'vue/dist/vue.esm-bundler';  
import ApiDocs from '../components/ApiDocs.vue';
import SideBar from '../components/api_documents/SideBar.vue';
import Content from '../components/api_documents/Content.vue';
import Heritages from '../components/api_documents/Heritages.vue';
import Introduction from '../components/api_documents/Introduction.vue';
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

const app = createApp(ApiDocs, railsProps);

app.use(pinia);
app.use(i18n);
app.component('SideBar', SideBar);
app.component('Content', Content);
app.component('Heritages', Heritages);
app.component('Introduction', Introduction);
app.mount('#app');  

