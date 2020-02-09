import Vue from './node_modules/vue'
import App from './App.vue'

Vue.component('router-view', () => import('./Notis.vue'))
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
