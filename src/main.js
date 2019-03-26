import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/reset.css'
import './assets/fonts/iconfont.css'

new Vue({
    el: '#app',
    render: h => h(App),
    router
})