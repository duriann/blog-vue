import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home/Home'
import News from '../pages/News/News'
import About from '../pages/About/About'
import Admin from '../pages/Admin/Admin'

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
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin
        }
    ]
})