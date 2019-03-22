<template>
    <div id='app'>
        <Header></Header>
        <Nav></Nav>
        <div class="content">
            <Tip class="tip"></Tip>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Header from './component/Header/Header.vue'
import Nav from './component/Nav/Nav.vue'
import Tip from './component/Tip/Tip'
export default {
    components: {
        Header,
        Nav,
        Tip
    }
}
</script>
<style lang="less">
    .content{
        max-width: 1226px;
        margin: 0 auto;
        margin-bottom: 10px;
        .tip{
            margin-bottom: 10px;
        }
    }
</style>