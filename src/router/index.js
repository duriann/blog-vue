import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home/Home'
import News from '../pages/News/News'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/news',
            name: 'news',
            component: News
        }
    ]
})