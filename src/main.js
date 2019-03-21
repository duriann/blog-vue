import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

new Vue({
    el: '#app',
    render: h => h(App),
    router
})