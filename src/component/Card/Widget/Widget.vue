<template>
  <div class="widget">
    <h2 class="title">{{title}}</h2>
    <ul class="items">
      <li v-for="item in data" :key="item.id" :class="mark">
        <!-- 如果url是首页 不需要传id过去  v-if判断的是  如果有url 说明那个是分类。。。 没有就是文章-->
        <router-link
          v-if="item.url"
          :to="{path:item.url+`${item.url==='/home'?'':'/'+item.id}`}"
        >{{item.name || item.title}}</router-link>

        <router-link v-else :to="{path:`/archives/${item.id}`}">{{item.name || item.title}}</router-link>

        <router-link
          class="child"
          v-for="child in item.children"
          :to="item.url +child.url + '/' +child.id"
          :key="child.id"
        >{{child.name || item.title}}</router-link>

        <!--当mark为article的时候 要显示时间-->
        <span class="time" v-if="mark==='article'">{{timeFormat(item.createTime)}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { treeToList } from '@/utils/index'
import moment from 'moment'
export default {
  props: ['mark'],
  data() {
    return {
      data: [],
      title: ''
    }
  },
  methods: {
    async getCategory() {
      if (this.$store.state.category.length === 0) {
        await this.$store.dispatch('getCategory')
      } else {
      }
      let cate = JSON.parse(JSON.stringify(this.$store.state.category))
      cate = cate.filter(item => item.isNav === 0) //过滤掉是nav导航的分类
      this.data = cate
    },
    async getRecentArticle() {
      let res = await this.$http.get('/article/getRecent')
      let { code, data } = res.data
      if (code === 0) {
        this.data = data
      }
    },
    timeFormat(time) {
      return moment(time).format('YYYY-MM-DD')
    }
  },
  mounted() {
    console.log('this.mark', this.mark)
    switch (this.mark) {
      case 'category':
        this.title = '分类'
        return this.getCategory()
      case 'article':
        this.title = '近期文章'
        return this.getRecentArticle()
      default:
        0
    }
  }
}
</script>
<style lang="less" scoped>
.widget {
  width: 360px;
  background-color: #fff;
  padding: 15px;
}
.title {
  font-size: 16px;
  font-weight: normal;
  line-height: 40px;
  color: #1abc9c;
  border-bottom: 1px solid #90bba8;
  margin-bottom: 5px;
}
.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  color: #00a67c;
  a {
    color: #00a67c;
  }
  li {
    width: 50%;
    // height: 30px;
    line-height: 30px;
    &.article {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .time {
      color: #999;
    }
  }
}
</style>