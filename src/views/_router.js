import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/views/Index.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/Test.vue')
    },
    {
      path: '/screen',
      name: 'screen',
      component: () => import('@/views/Screen.vue')
    },
    {
      path: '/green',
      name: 'green',
      component: () => import('@/views/Green.vue')
    },
    {
      path: '/control',
      name: 'control',
      component: () => import('@/views/Control.vue')
    },
    {
      path: '/songs',
      name: 'songs',
      component: () => import('@/views/Songs.vue')
    },
  ]
})
