import Vue from 'vue'
import Router from 'vue-router'

import Title from '@/templates/Title.vue';
// import Tema from '@/templates/Tema.vue';
// import Datum from '@/templates/Datum.vue';
// import Namnskylt from '@/templates/Namnskylt.vue';
// import LowerThird from '@/templates/LowerThird.vue';
// import TitleSmall from '@/templates/TitleSmall.vue';
// import Swish from '@/templates/Swish.vue';
// import LivsvagTitle from '@/templates/LivsvagTitle.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'LivsvagTitle',
    //   component: LivsvagTitle
    // }
    
    {
      path: '/',
      name: 'title',
      component: Title
    },
    /*
    {
      path: '/',
      name: 'datum',
      component: Datum
    },
    {
      path: '/',
      name: 'tema',
      component: Tema
    },
    {
      path: '/',
      name: 'namnskylt',
      component: Namnskylt
    },
    {
      path: '/',
      name: 'lowerthird',
      component: LowerThird
    },
    {
      path: '/',
      name: 'swish',
      component: Swish
    }*/
  ]
})
