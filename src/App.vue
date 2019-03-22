<template>
    <div id='app'>
        <Header></Header>
        <Nav></Nav>
        <Tip></Tip>
        <div class="content">
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
    
</style>