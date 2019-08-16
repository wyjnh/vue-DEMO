import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import MavonEditor from '@/pages/components/mavon-editor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MavonEditor',
      component: MavonEditor
    },
    {
      path: '/index',
      name: 'HelloWorld',
      component: HelloWorld
    }

  ]
})
