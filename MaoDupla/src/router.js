import Vue from 'vue'
import Router from 'vue-router'
import QRCode from './views/QRCode.vue'
import main from './views/MainView.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/qrcode',
      name: 'qrcode',
      component: QRCode
    },
    {
        path: '/',
        name: 'main',
        component:  main
       
      },
    
  ]
})

