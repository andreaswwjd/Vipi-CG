import Vue from './node_modules/vue'
import App from './App.vue'
// import VueSocketIO from 'vue-socket.io'


// Vue.config.productionTip = false
// Vue.use(new VueSocketIO({
//   debug: true,
//   // connection: 'localhost:3000',
//   connection: window.location.origin,
//   // options: {path: '/'}
// }))

Vue.component('router-view', () => import('./Sangplatta.vue'))

new Vue({
  render: h => h(App),
}).$mount('#app')
