<template>
  <div class="front-end">
    <Common ref="commonRef" type="Search" :cname="cname" :isParent="false" :keyword="keyword"></Common>
  </div>
</template>
<script>
import Common from '../Common/Common'
export default {
  props: ['keyword'],
  data() {
    return {
      cname: '' //分类名称 是根据main.js中的路由设置的
    }
  },
  methods: {},
  components: {
    Common
  },
  mounted() {
    this.cname = this.$route.params.name
  },
  watch: {
    '$route.path'(newVal, oldVal) {
      this.$refs.commonRef.getArticles(1, this.keyword)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
