import Vue from 'vue'
// import router from './router'
import Contol from './views/Control.vue'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false
Vue.use(new VueSocketIO({
  debug: true,
  connection: window.location.origin,
  // options: {path: '/'}
}))

new Vue({
  // router,
  render: h => h(Contol),
}).$mount('#app')
