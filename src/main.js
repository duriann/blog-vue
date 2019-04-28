import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router/index'

import ElementUI from 'element-ui'

import './assets/reset.css'
import './assets/fonts/iconfont.css'
// import 'element-ui/lib/theme-chalk/index.css'; 使用cdn的时候不需要导入样式
import http from '@/utils/Http'
import store from './vuex/store'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.prototype.$http = http

router.beforeEach((to, from, next) => {
  // 给每个路由传递一个name参数
  to.params.name = to.name
  
  next()
})
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
})