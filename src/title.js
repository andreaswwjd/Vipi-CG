import Vue from 'vue'
import App from './App.vue'

Vue.component('router-view', () => import('./templates/Title.vue'))
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
