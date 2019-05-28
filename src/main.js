import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router/index'

import ElementUI from 'element-ui'
import 'highlight.js/styles/xcode.css'
import './assets/reset.css'
import './assets/fonts/iconfont.css'
//使用cdn的时候不需要导入样式
// import 'element-ui/lib/theme-chalk/index.css'; 
import http from '@/utils/Http'
import store from './vuex/store'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.prototype.$http = http

router.beforeEach((to, from, next) => {
  to.params.name = to.name
  if (to.meta.requireAuth) {
    let token = localStorage.getItem('token')
    if (!token) {
      ELEMENT.Message({
        message: 'token验证失败QAQ',
        type: 'error'
      })
      next({
        path: '/home'
      })
    }
  }
  next()
})
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
})