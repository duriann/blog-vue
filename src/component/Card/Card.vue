<template>
  <component
    :is="card"
    v-if="card"
    :detail="detail"
  ></component>
</template>
<script>
export default {
  props: ['type','detail'],
  data() {
    return {
      card: null
    }
  },
  computed: {
    loader() {
      console.log('this.type', this.type)
      if (!this.type) {
        return null
      }
      return () => import(`./${this.type}/${this.type}`)
    }
  },
  mounted() {
    console.log('this.props.detail',this.detail)
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
