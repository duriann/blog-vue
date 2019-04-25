<template>
  <component :is="card" v-if="card" :detail="detail" :mark="mark"></component>
</template>
<script>
export default {
  //mark 用于判断widget 需要获取什么样的数据
  props: ['type', 'detail', 'mark'],
  data() {
    return {
      card: null
    }
  },
  computed: {
    loader() {
      if (!this.type) {
        return null
      }
      return () => import(`./${this.type}/${this.type}`)
    }
  },
  mounted() {
    this.loader()
      .then(() => {
        this.card = () => this.loader()
      })
      .catch(() => {
        this.card = () => import('./Article/Article')
      })
  }
}
</script>
<style lang="less" scoped>
</style>
