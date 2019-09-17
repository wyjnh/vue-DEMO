import Vue from 'vue'
import Router from 'vue-router'
import MavonEditor from '@/pages/components/mavon-editor'
import VuexPage from '@/pages/components/vuex-page'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      component:VuexPage,
    },
    {
      path: '/mavonEditor',
      name: 'MavonEditor',
      component: MavonEditor
    },
  ]
})
