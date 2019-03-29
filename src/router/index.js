import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home/Home'
import News from '../pages/News/News'
import About from '../pages/About/About'
import Index from '../pages/Index/Index'
import Admin from '../pages/Admin/Admin'

import User from '../pages/Admin/User/User'
import ArticleAdd from '../pages/Admin/Article/ArticleAdd'
import ArticleList from '../pages/Admin/Article/ArticleList'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', redirect: '/home' },
        {
            path: '/index',
            name: 'index',
            component: Index,
            children: [
                {
                    path: '/home',
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
                }
            ]
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
            children: [
                {
                    path: '/user/list',
                    name: 'userlist',
                    component: User
                },
                {
                    path: '/article/add',
                    name: 'articleAdd',
                    component: ArticleAdd
                },
                {
                    path: '/article/list',
                    name: 'articleList',
                    component: ArticleList
                }
            ]
        }
        
    ]
})