<template>
    <div class="home">
        <div>
            <Card type='Article'></Card>
            <Card type='Article'></Card>
            <Card type='Article'></Card>
            <Card type='Article'></Card>
       
        </div>
        <div class="right">
            <Social></Social>
            <Card type='Category'></Card>
            <Card type='Category'></Card>
            <Card type='Category'></Card>
        </div>
    </div>
</template>
<script>
import Card from  '@/component/Card/Card'
import Social from '@/component/Social/Social'
export default {
    components: {
        Card,
        Social
    }
}
</script>
<style lang="less">
    .home{
        display: flex;
        .right{
            margin-left: 10px;
            .social{
                margin-bottom: 10px;
            }
            .category{
                margin-bottom: 10px;
            }
        }
    }
</style>