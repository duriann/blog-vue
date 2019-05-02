<template>
  <div class="common">
    <div class="main">
      <component :is="category" :cname="cname"></component>
      <Card type="Article" v-for="item in data" :key="item.id" :detail="item"></Card>
    </div>
    <!-- <el-col v-if="data.length">
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        @current-change="pageHandle"
      ></el-pagination>
    </el-col>-->
    <Pagination :totalCount="totalCount" :pageSize="pageSize" @current-change="pageHandle"></Pagination>
  </div>
</template>
<script>
import Card from '@/component/Card/Card'
import Social from '@/component/Social/Social'
import Pagination from '@/component/Pagination/Pagination'

export default {
  // props: ['type', 'data', 'cname', 'totalCount', 'pageSize'], //cname

  props: {
    type: {
      //是否需要Category组件 需要就传一个type="Category"
      type: String,
      required: false
    },
    cname: {
      //如果该common组件需要用到Category组件的话  就需要传这个过去
      type: String,
      required: false
    },
    id: {
      //分类id
      type: Number,
      required: false
    },
    isParent: {
      // 是否是顶级菜单节点 与id一起传的
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      category: null, //卡片类型,

      currPage: 1,
      pageSize: 6,
      totalCount: 0,
      keyword: '',
      data: []
    }
  },
  methods: {
    pageHandle(currPage) {
      this.getArticles(currPage)
    },
    async getArticles(currPage = 1) {
      const res = await this.$http.get('/article/listByPage', {
        params: {
          keyword: this.keyword,
          currPage,
          pageSize: this.pageSize,
          parentId: this.isParent ? this.id : null,
          categoryId: this.isParent ? null : this.id
        }
      })
      const { data, code } = res.data
      if (code === 0) {
        this.currPage += 1
        this.totalCount = data.totalCount
        this.data = data.pages
      }
    }
  },
  computed: {
    loader() {
      return () => import(`@/component/Card/${this.type}/${this.type}`)
    }
  },
  async mounted() {
    this.loader()
      .then(() => {
        this.category = () => this.loader()
      })
      .catch(() => {
        // console.error('no type')
      })
    await this.getArticles()
    console.log('totalCount', this.totalCount)
  },
  watch() {},
  components: {
    Card,
    Social,
    Pagination
  }
}
</script>
<style lang="less" scoped>
</style>