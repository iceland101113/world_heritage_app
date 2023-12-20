import { createApp } from 'vue/dist/vue.esm-bundler';  
import ApiDocs from '../components/ApiDocs.vue';
import SideBar from '../components/api_documents/SideBar.vue';
import Content from '../components/api_documents/Content.vue';
import Heritages from '../components/api_documents/Heritages.vue';
import Introduction from '../components/api_documents/Introduction.vue';
import pinia from '../store/index.js';

const app = createApp(ApiDocs);

app.use(pinia);
app.component('SideBar', SideBar);
app.component('Content', Content);
app.component('Heritages', Heritages);
app.component('Introduction', Introduction);
app.mount('#app');  

