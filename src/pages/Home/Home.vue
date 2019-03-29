<template>
  
  <div class="home">
    <Common :data="articles"></Common>
    <el-col>
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        @current-change="pageHandle"
      >
      </el-pagination>
    </el-col>
  </div>
</template>
<script>
import Common from '../Common/Common'
export default {
  data(){
    return {
      currPage: 1,
      pageSize: 3,
      totalCount: 0,
      keyword: '',
      articles: []
    }
  },
  methods: {
    pageHandle(currPage){
      this.getArticles(currPage)
    },
    async getArticles(currPage = 1){
      const res = await this.$http.get('/api/article/listByPage',{
        params: {
          keyword: this.keyword,
          currPage,
          pageSize: this.pageSize
        }
      })
    const {data, code} = res.data
      console.log(data,res)
      if(code === 0){
        this.currPage +=1
        this.totalCount = data.totalCount
        this.articles = data.pages
      }    
    }
  },
  mounted(){
    this.getArticles()
  },
  components: {
    Common,
  }
}
</script>
<style lang="less" scoped>

</style>