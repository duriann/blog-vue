import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router/index'
import './assets/reset.css'
import './assets/fonts/iconfont.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import store from './vuex/store'

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.prototype.$http = axios

new Vue({
    el: '#app',
    store,
    render: h => h(App),
    router
})