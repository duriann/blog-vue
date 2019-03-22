<template>
    <component :is="card" v-if="card"></component>
</template>
<script>
export default {
    props: ['type'],
    data(){
        return {
            card: null
        }
    },
    computed: {
        loader(){
            console.log('this.type',this.type)
            if(!this.type){
                return null
            }
            return () => import(`./${this.type}/${this.type}`)
        }
    },
    mounted(){
        this.loader()
        .then(()=>{
            this.card = () => this.loader()
        })
        .catch(()=>{
            this.card = () => import('./Article/Article')
        })
    }
}
</script>
<style lang="less" scoped>

</style>
