<template>
    <div class="nav">
        <ul>
            <li @click="active(item.id)" v-for="item in lis" :key="item.id" :class="{current: item.isActive}">
                <router-link :to='item.url'>{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            lis: [
                {id: 1, name: '网站首页',url: '/',isActive: true},
                {id: 2, name: '新闻科普',url: '/news',isActive: false},
                {id: 3, name: '学术研究',url: '/news',isActive: false},
                {id: 4, name: '生物技术',url: '/news',isActive: false},
                {id: 5, name: '编程技术',url: '/news',isActive: false},
                {id: 6, name: '安全运维',url: '/news',isActive: false},
                {id: 7, name: '关于',url: '/about',},
            ]
        }
    },
    methods: {
        active(id){
            let lis = this.lis
            lis.map(item=>{
                if(item.id === id){
                    item.isActive = true
                }else{
                    item.isActive = false
                }
            })
            this.lis = lis
        }
    }
}
</script>
<style lang="less">
    .nav{
        background-color: #4a4a4a;
    }
    .nav ul{
        display: flex;
        opacity: .9;
        max-width: 1226px;
        margin: 0 auto;
    }
    .nav li{
        height: 52px;
        font-size: 16px;
        color: #fff;
        width: 104px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .nav li.current{
        background-color: #16a085;
    }
    .nav a{
        line-height: 52px;
        text-align: center;
    }
</style>