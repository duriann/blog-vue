import Vue from 'vue'
import App from './src/App.vue'
import router from './src/router/index'

import './src/app.less'
import './src/app.1.less'


new Vue({
    el: '#app',
    render: h => h(App),
    router
})