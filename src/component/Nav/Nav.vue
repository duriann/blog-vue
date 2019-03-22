<template>
    <div class="nav">
        <ul>
            <li v-for="item in lis" :key="item.id" :class="{current: item.isActive}">
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            lis: [
                {id: 1, name: '网站首页',isActive: true},
                {id: 2, name: '新闻科普'},
                {id: 3, name: '学术研究'},
                {id: 4, name: '生物技术'},
                {id: 5, name: '编程技术'},
                {id: 6, name: '安全运维'},
                {id: 7, name: '关于我也测试'},
            ]
        }
    }
}
</script>
<style lang="less">
    .nav ul{
        display: flex;
        background-color: #4a4a4a;
        opacity: .9;
    }
    .nav li{
        height: 52px;
        font-size: 16px;
        color: #fff;
        width: 104px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .nav li.current{
        background-color: #16a085;
    }
</style>