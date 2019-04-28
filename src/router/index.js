import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home/Home'
import FrontEnd from '../pages/FrontEnd/FrontEnd'
import FEVue from '../pages/FrontEnd/Vue/FEVue'
import React from '../pages/FrontEnd/React/React'


import BackEnd from '../pages/BackEnd/BackEnd'
import Java from '../pages/BackEnd/Java/Java'
import ThinkAbout from '../pages/ThinkAbout/ThinkAbout'

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
                    path: '/frontend/vue/:id',
                    name: 'FEVue',
                    component: FEVue,
                    props: true
                },
                {
                    path: '/frontend/react/:id',
                    name: 'react',
                    component: React,
                    props: true
                },
                {
                    path: '/backend/:id',
                    name: 'backend',
                    component: BackEnd,
                    props: true
                },
                {
                    path: '/backend/java/:id',
                    name: 'java',
                    component: Java,
                    props: true
                },
                {
                    path: '/thinkabout/:id',
                    name: 'thinkabout',
                    component: ThinkAbout,
                    props: true
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