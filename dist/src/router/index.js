import Vue from 'vue'
import Router from 'vue-router'
import MavonEditor from '@/pages/components/mavon-editor'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MavonEditor',
      component: MavonEditor
    },
  ]
})
