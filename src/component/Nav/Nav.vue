<template>
  <div class="nav">
    <div class="wrapper">
      <ul ref="ulmenu">
        <li class="restitle">
          <router-link to="/">菠萝君,沉迷于开饭店的程序猿</router-link>
        </li>
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
        <li class="cate" @click="toggleMenu">
          <i class="iconfont icon-fenlei"></i>
        </li>
      </ul>

      <div class="search" @click="searchHandle">
        <i v-show="showSearch" class="inputicon iconfont icon-search-1-copy"></i>

        <transition name="fade">
          <input
            v-model="searchKey"
            @keyup.enter="search"
            ref="searchInput"
            @click.stop
            v-show="showSearch"
            type="text"
          >
        </transition>
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
      menus: [],
      showSearch: false,
      searchKey: ''
    }
  },
  methods: {
    // 搜索文章
    search() {
      console.log('this.searchKey', this.searchKey)
      if (!this.searchKey) {
        this.showSearch = false
        return this.$message({
          type: 'error',
          message: '搜索条件不能为空!',
          duration: 500
        })
      }
      this.$router.push({
        name: 'search',
        params: { keyword: this.searchKey }
      })
      this.searchKey = ''
    },
    searchHandle() {
      console.log('search hanlder')
      this.showSearch = !this.showSearch
      if (this.showSearch) {
        this.$nextTick(() => {
          this.$refs.searchInput.focus()
        })
      }
    },
    toggleMenu() {
      //在小屏的时候 点击添加类 实现menu显示和影藏
      this.$refs.ulmenu.classList.toggle('responsive')
    },
    hideMenu() {
      this.$refs.ulmenu && this.$refs.ulmenu.classList.remove('responsive')
    },
    active(url) {
      this.hideMenu()
      let lis = this.menus
      lis.map(item => {
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
      this.showSearch = false
    }
  },
  mounted() {
    this.getCategory()
  }
}
</script>
<style lang="less" scoped>
.nav {
  .wrapper {
    padding: 0 20px;
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
    position: relative;
    cursor: pointer;
    text-align: center;
    line-height: 52px;
    width: 54px;
    background-color: red;
    height: 100%;
    height: 52px;
    background-color: #16a085;
    color: #fff;
    input {
      padding-left: 30px;
      position: absolute;
      right: 0;
      top: 52px;
      font-size: 16px;
      outline: none;
      height: 34px;
      // border: 1px solid rgb(22, 160, 133);
      z-index: 9999;
    }
    .inputicon {
      position: absolute;
      z-index: 9999;
      top: 46px;
      color: #ccc;
      left: -144px;
      font-size: 18px;
      z-index: 10000;
    }
    i {
      font-size: 20px;
    }
  }
  .restitle {
    display: none;
  }
  .cate {
    color: #fff;
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    i {
      display: block;
      text-align: center;
      line-height: 52px;
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
    // &.current {
    //   background-color: #16a085;
    // }
    // &:hover .child {
    //   background-color: #16a085;
    //   display: block;
    // }
    // &:hover {
    //   background-color: #16a085;
    // }
    .child {
      display: none;
      // &:hover {
      //   background-color: #4a4a4a;
      // }
    }
  }
  a {
    // transition: 0.3s;
    width: 100%;
    line-height: 52px;
    text-align: center;
    color: #fff;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>