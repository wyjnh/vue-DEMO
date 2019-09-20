// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入vuex
import store from './store'

// Element 全局引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI,{ size: 'small', zIndex: 3000 });

// Element 按需引入
// import { Button, Select } from 'element-ui';
// Vue.use(Button)
// Vue.use(Select)
// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,// 引入vuex
  router,
  components: { App },
  template: '<App/>'
})
