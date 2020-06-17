import Vue from 'vue'
import App from './App.vue'
import router from './views/_router.js'
import VueSocketIO from 'vue-socket.io'


Vue.config.productionTip = false
Vue.use(new VueSocketIO({
  debug: true,
  connection: window.location.hostname + ':3000',
}))

new Vue({
  router, 
  render: h => h(App)
}).$mount('#app')
