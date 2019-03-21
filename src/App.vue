<template>
    <div id='app'>
        <h1 class="hello">hello vue</h1>
        <router-link to="/header">header</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less">
    .hello{
        background-color: pink;
    }
</style>