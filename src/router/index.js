import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home/Home'
import FrontEnd from '../pages/FrontEnd/FrontEnd'
import About from '../pages/About/About'
import Index from '../pages/Index/Index'
import Admin from '../pages/Admin/Admin'

import User from '../pages/Admin/User/User'
import ArticleAdd from '../pages/Admin/Article/ArticleAdd'
import ArticleList from '../pages/Admin/Article/ArticleList'
import Archives from '../pages/Archives/Archives'


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
                    path: '/frontend/:id',
                    name: 'frontend',
                    component: FrontEnd,
                    props: true
                },
                {
                    path: '/about',
                    name: 'about',
                    component: About
                },
                {
                    path: '/archives/:id',
                    name: 'archives',
                    component: Archives
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