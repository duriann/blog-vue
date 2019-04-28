<template>
  <div class="common">
    <div class="main">
      <div class="left">
        <component :is="category" :cname="cname"></component>
        <Card type="Article" v-for="item in data" :key="item.id" :detail="item"></Card>
      </div>
      <div class="right">
        <Social></Social>
        <Card type="Widget" mark="category"></Card>
        <Card type="Widget" mark="article"></Card>
      </div>
    </div>
    <el-col>
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        @current-change="pageHandle"
      ></el-pagination>
    </el-col>
  </div>
</template>
<script>
import Card from '@/component/Card/Card'
import Social from '@/component/Social/Social'
export default {
  props: ['type', 'data', 'cname', 'totalCount', 'pageSize'], //cname 如果该common组件需要用到Category组件的话  就需要传这个过去
  data() {
    return {
      category: null //卡片类型
    }
  },
  methods: {
    pageHandle(currPage) {
      this.$emit('getCommonData', currPage)
    }
  },
  computed: {
    loader() {
      return () => import(`@/component/Card/${this.type}/${this.type}`)
    }
  },
  mounted() {
    this.loader()
      .then(() => {
        this.category = () => this.loader()
      })
      .catch(() => {
        // console.error('no type')
      })
  },
  components: {
    Card,
    Social
  }
}
</script>
<style lang="less" scoped>
.common .main {
  justify-content: space-between;
  display: flex;
  .left {
    flex: 1;
    .article {
      margin-bottom: 10px;
    }
  }
  .right {
    margin-left: 10px;
    .social {
      margin-bottom: 10px;
    }
    .widget {
      margin-bottom: 10px;
    }
  }
}
</style>