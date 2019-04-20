<template>
  <div class="nav">
    <div class="wrapper">
      <ul>
        <li
          @click="active(item.url)"
          v-for="item in lis"
          :key="item.id"
          :class="{current: item.isActive}"
        >
          <router-link :to="item.url">{{item.name}}</router-link>
        </li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search-1-copy"></i>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lis: [
        { id: 1, name: "网站首页", url: "/home", isActive: true },
        { id: 2, name: "新闻科普", url: "/news", isActive: false },
        { id: 3, name: "学术研究", url: "/xueshu", isActive: false },
        { id: 4, name: "生物技术", url: "/shengwu", isActive: false },
        { id: 5, name: "编程技术", url: "/biancheng", isActive: false },
        { id: 6, name: "安全运维", url: "/anquan", isActive: false },
        { id: 7, name: "关于", url: "/about" }
      ]
    };
  },
  methods: {
    active(url) {
      let lis = this.lis;
      lis.map(item => {
        if (item.url === url) {
          item.isActive = true;
        } else {
          item.isActive = false;
        }
      });
      this.lis = lis;
    }
  },
  mounted() {
    console.log(this.$route.path);
    this.active(this.$route.path);
  }
};
</script>
<style lang="less" scoped>
.nav {
  background-color: #4a4a4a;
}
.wrapper {
  max-width: 1226px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.nav ul {
  display: flex;
  opacity: 0.9;
}
.nav .search {
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
.nav li {
  height: 52px;
  font-size: 16px;
  color: #fff;
  width: 104px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.nav li.current {
  background-color: #16a085;
}
.nav a {
  width: 100%;
  line-height: 52px;
  text-align: center;
  color: #fff;
}
</style>