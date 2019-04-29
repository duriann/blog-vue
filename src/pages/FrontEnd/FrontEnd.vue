<template>
  <div class="front-end">
    <Common type="Category" :cname="cname" :isParent="true" :id="id"></Common>
  </div>
</template>
<script>
import Common from '../Common/Common'
export default {
  props: ['id'], //这个props是路由那边传过来的
  data() {
    return {
      cname: '' //分类名称 是根据main.js中的路由设置的
    }
  },
  methods: {
    // async getArticles(currPage = 1) {
    //   const res = await this.$http.get('/article/listByPage', {
    //     params: {
    //       keyword: this.keyword,
    //       currPage,
    //       pageSize: this.pageSize,
    //       parentId: this.id
    //     }
    //   })
    //   const { data, code } = res.data
    //   console.log('fontEnd data', res.data)
    //   if (code === 0) {
    //     this.currPage += 1
    //     this.totalCount = data.totalCount
    //     this.feData = data.pages
    //   }
    // }
  },
  components: {
    Common
  },
  mounted() {
    this.cname = this.$route.params.name
  }
}
</script>
<style lang="less" scoped>
</style>
