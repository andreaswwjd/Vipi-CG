import Vue from 'vue'
import App from './App.vue'
import router from './_router.js'
import VueSocketIO from 'vue-socket.io'


Vue.config.productionTip = false
Vue.use(new VueSocketIO({
  debug: true,
  // connection: 'localhost:3000',
  connection: window.location.origin,
  // options: {path: '/'}
}))

new Vue({
  router, 
  render: h => h(App)
}).$mount('#app')
