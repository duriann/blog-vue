import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import(/* webpackChunkName: 'home' */ '../pages/Home/Home')
const FrontEnd = () => import(/* webpackChunkName: 'FrontEnd' */ '../pages/FrontEnd/FrontEnd')
const FEVue = () => import(/* webpackChunkName: 'FEVue' */ '../pages/FrontEnd/Vue/FEVue')
const React = () => import(/* webpackChunkName: 'React' */ '../pages/FrontEnd/React/React')


const BackEnd = () => import(/* webpackChunkName: 'BackEnd' */ '../pages/BackEnd/BackEnd')
const Java = () => import(/* webpackChunkName: 'Java' */ '../pages/BackEnd/Java/Java')
const ThinkAbout = () => import(/* webpackChunkName: 'ThinkAbout' */ '../pages/ThinkAbout/ThinkAbout')

const Index = () => import(/* webpackChunkName: 'Index' */ '../pages/Index/Index')
const Admin = () => import(/* webpackChunkName: 'Admin' */ '../pages/Admin/Admin')

const User = () => import(/* webpackChunkName: 'User' */ '../pages/Admin/User/User')
const ArticleAdd = () => import(/* webpackChunkName: 'ArticleAdd' */ '../pages/Admin/Article/ArticleAdd')
const ArticleList = () => import(/* webpackChunkName: 'ArticleList' */ '../pages/Admin/Article/ArticleList')
const Archives = () => import(/* webpackChunkName: 'Archives' */ '../pages/Archives/Archives')


Vue.use(Router)

export default new Router({
    mode: 'history',
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