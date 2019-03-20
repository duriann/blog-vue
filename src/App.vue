<template>
    <div>
        hello vue,
        <h3>hello pineapplea</h3>
        <span>{{count}}</span>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data(){
        return {
            count: 0
        }
    },
    mounted(){
        this.handle = setInterval(()=>{
            this.count++
        },1000)
    },
    destroyed(){
        clearInterval(this.handle)
    }

}
</script>
<style lang="less">
    
</style>