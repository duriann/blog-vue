<template>
  <div class="nav">
    <div class="wrapper">
      <ul>
        <li
          @click="active(item.url)"
          v-for="item in menus"
          :key="item.id"
          :class="{current: item.isActive}"
        >
          <!-- 如果url是首页 不需要传id过去 -->
          <router-link :to="{path:item.url+`${item.url==='/home'?'':'/'+item.id}`}">{{item.name}}</router-link>
          <router-link
            class="child"
            v-for="child in item.children"
            :to="item.url +child.url + '/' +child.id"
            :key="child.id"
          >{{child.name}}</router-link>
        </li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search-1-copy"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { treeToList } from '@/utils/'
export default {
  data() {
    return {
      menus: []
    }
  },
  methods: {
    active(url) {
      let lis = this.menus
      lis.map(item => {
        console.log('url', url, 'item.url', item.url)
        if (url.includes(item.url)) {
          item.isActive = true
        } else {
          item.isActive = false
        }
      })
      this.menus = lis
    },
    async getCategory() {
      if (this.$store.state.category.length === 0) {
        await this.$store.dispatch('getCategory')
      } else {
      }
      let cate = JSON.parse(JSON.stringify(this.$store.state.category))
      cate.forEach(item => {
        if (item.url === '/home') {
          item.isActive = true
        } else {
          item.isActive = false
        }
      })
      // cate = cate.filter(item=>item.isNav===0)//过滤掉是nav导航的分类
      // this.menus = treeToList(cate)

      this.menus = cate
      //放到这的原因是为了刷新的时候也能根据浏览器url高亮对应菜单
      this.active(this.$route.path)
    }
  },
  watch: {
    //监听路由的改变 为了右边的分类点击的时候 菜单也能高亮
    '$route.path'(newVal, oldVal) {
      // console.log('Nav watch', newVal)
      this.active(newVal)
    }
  },
  mounted() {
    this.getCategory()
    console.log(this.$route.path)
  }
}
</script>
<style lang="less" scoped>
.nav {
  .wrapper {
    max-width: 1226px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  background-color: #4a4a4a;
  ul {
    height: 52px;
    display: flex;
    opacity: 0.9;
  }
  .search {
    cursor: pointer;
    text-align: center;
    line-height: 52px;
    width: 54px;
    background-color: red;
    height: 100%;
    height: 52px;
    background-color: #16a085;
    color: #fff;
    i {
      font-size: 20px;
    }
  }
  li {
    margin-right: 1px;
    font-size: 16px;
    color: #fff;
    width: 104px;
    display: flex;
    align-items: center;
    cursor: pointer;
    flex-direction: column;
    &.current {
      background-color: #16a085;
    }
    &:hover .child {
      background-color: #16a085;
      display: block;
    }
    &:hover {
      background-color: #16a085;
    }
    .child {
      display: none;
      &:hover {
        background-color: #4a4a4a;
      }
    }
  }
  a {
    width: 100%;
    line-height: 52px;
    text-align: center;
    color: #fff;
  }
}
</style>