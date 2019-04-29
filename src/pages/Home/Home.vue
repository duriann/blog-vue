<template>
  <div class="home">
    <Common></Common>
  </div>
</template>
<script>
/**
 * :data="articles"
      :totalCount="totalCount"
      :pageSize="pageSize"
      @getCommonData="getArticles"
 */
import Common from '../Common/Common'
export default {
  data() {
    return {
      // currPage: 1,
      // pageSize: 10,
      // totalCount: 0,
      // keyword: '',
      // articles: []
    }
  },
  methods: {
    // pageHandle(currPage) {
    //   this.getArticles(currPage)
    // },
    // async getArticles(currPage = 1) {
    //   const res = await this.$http.get('/article/listByPage', {
    //     params: {
    //       keyword: this.keyword,
    //       currPage,
    //       pageSize: this.pageSize
    //     }
    //   })
    //   const { data, code } = res.data
    //   if (code === 0) {
    //     this.currPage += 1
    //     this.totalCount = data.totalCount
    //     this.articles = data.pages
    //   }
    // }
  },
  mounted() {
    // this.getArticles()
  },
  components: {
    Common
  }
}
</script>
<style lang="less" scoped>
</style>