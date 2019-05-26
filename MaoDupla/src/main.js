import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' 
import VueQrcodeReader from "vue-qrcode-reader";

Vue.use(VueQrcodeReader);
Vue.use(Vuetify);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDAk_W5GEdg4988ew0o13yN1zTB6Pzaub4',
    libraries: '', // This is required if you use the Autocomplete plugin
  },

})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
