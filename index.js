import Vue from 'vue'
import App from './src/App.vue'
import router from './src/router/index'

new Vue({
    el: '#app',
    render: h => h(App),
    router
})