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
      path: '/screen',
      name: 'screen',
      component: () => import('@/views/Screen.vue')
    },
    // {
    //   path: '/green',
    //   name: 'green',
    //   component: () => import('@/views/Green.vue')
    // },
    // {
    //   path: '/control',
    //   name: 'control',
    //   component: () => import('@/views/Control.vue')
    // },
    {
      path: '/songs',
      name: 'songs',
      component: () => import('@/views/Songs.vue')
    },
    // {
    //   path: '/title',
    //   name: 'title',
    //   component: () => import('./templates/Title.vue')
    // },
    // {
    //   path: '/datum',
    //   name: 'datum',
    //   component: () => import('./templates/Datum.vue')
    // },
    // {
    //   path: '/tema',
    //   name: 'tema',
    //   component: () => import('./templates/Tema.vue')
    // },
    // {
    //   path: '/namnskylt',
    //   name: 'namnskylt',
    //   component: () => import('./templates/Namnskylt.vue')
    // },
    // {
    //   path: '/lowerthird',
    //   name: 'lowerthird',
    //   component: () => import('./templates/LowerThird.vue')
    // },
  ]
})
