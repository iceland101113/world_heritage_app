// To see this message, add the following to the `<head>` section in your
// views/layouts/application.html.erb
//
//    <%= vite_client_tag %>
//    <%= vite_javascript_tag 'application' %>
console.log('Vite ⚡️ Rails')

// If using a TypeScript entrypoint file:
//     <%= vite_typescript_tag 'application' %>
//
// If you want to use .jsx or .tsx, add the extension:
//     <%= vite_javascript_tag 'application.jsx' %>

console.log('Visit the guide for more information: ', 'https://vite-ruby.netlify.app/guide/rails')

// Example: Load Rails libraries in Vite.
//
// import * as Turbo from '@hotwired/turbo'
// Turbo.start()
//
// import ActiveStorage from '@rails/activestorage'
// ActiveStorage.start()
//
// // Import all channels.
// const channels = import.meta.globEager('./**/*_channel.js')

// Example: Import a stylesheet in app/frontend/index.css
// import '~/index.css'
import { createApp } from 'vue/dist/vue.esm-bundler';  
import App from '../components/App.vue';
import LocationTable from '../components/LocationTable.vue';
// import 'bootstrap/js/src/alert'  
// import 'bootstrap/js/src/button'  
// import 'bootstrap/js/src/carousel'  
// import 'bootstrap/js/src/collapse'  
// import 'bootstrap/js/src/dropdown'  
// import 'bootstrap/js/src/modal'  
// import 'bootstrap/js/src/popover'  
// import 'bootstrap/js/src/scrollspy'  
// import 'bootstrap/js/src/tab'  
// import 'bootstrap/js/src/toast'  
// import 'bootstrap/js/src/tooltip' 

import * as bootstrap from 'bootstrap';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// const app = createApp({  
//   data() {  
//     return {  
//       course: 'Intro to Vue 3 and Rails'  
//     }  
//   }  
// })  

const app = createApp(App);
// app.use(VueGoogleMaps, {
//     load: {
//         key: 'AIzaSyCR8Unxd3j0H_uVlrdxZPmwREJs0g_bieA',
//         // language: 'de',
//     },
// }).mount('#app');
app.use(ElementPlus)
app.component('LocationTable', LocationTable)
app.mount('#app');  
// console.log("app", app);  
window.bootstrap = bootstrap;

// initialize the page
window.addEventListener('load', (event) => {
    initPage();
});
window.addEventListener('turbo:render', (event) => {
    initPage();
});
function initPage() {
      // initialize popovers
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
  }
)};
