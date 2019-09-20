import Vue from 'vue'
import Router from 'vue-router'
import MavonEditor from '@/pages/components/mavon-editor'
import VuexPage from '@/pages/components/vuex-page'
import LoginPage from '@/pages/pages/login-page'
import DoclistPage from '@/pages/pages/doc/doclistPage'


// 组件导入
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      component:LoginPage,
    },
    {
      path:"/login",
      component:LoginPage,
    },
    {
      path : "/doclist",
      component : DoclistPage
    },
    {
      path:"/vuex",
      component:VuexPage,
    },
    {
      path: '/mavonEditor',
      name: 'MavonEditor',
      component: MavonEditor
    },
  ]
})
