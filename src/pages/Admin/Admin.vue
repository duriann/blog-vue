<template>
  <el-container class="home-container">
    <el-header class="home-header">
      <el-row :gutter="20">
        <el-col :span="3" class="logo">
          <img src="@/assets/logo.png" alt="bolo">
        </el-col>
        <el-col :span="16" class="title">博客后台管理系统</el-col>
        <el-col :span="4">
          <span>欢迎xx</span>
          <span class="logout" @click.prevent="logout" href="#">退出</span>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="home-content">
      <el-aside width="200px" class="home-aside">
        <el-menu
          class="menu"
          :unique-opened="true"
          :default-active="activeMenu"
          :router="true"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu :index="menu.path" v-for="menu in menuList" :key="menu.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ menu.name }}</span>
            </template>
            <el-menu-item :index="child.path" v-for="child in menu.children" :key="child.id">
              <i class="el-icon-menu"></i>
              <span>{{ child.name }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="home-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      activeMenu: '/user'
    }
  },
  created() {
    this.fetchMenuList()

    this.setActiveMenu()
  },
  methods: {
    async fetchMenuList() {
      const ret = await this.$http.get(`/adminMenu/list`)
      console.log(ret)
      const { code, data } = ret.data
      if (code === 0) {
        this.menuList = data
      }
    },
    logout() {
      this.$confirm('您确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          localStorage.removeItem('token')
          this.$router.push('/login')

          this.$message({
            type: 'success',
            message: '退出成功'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取退出'
          })
        })
    },
    setActiveMenu() {
      let path = this.$route.path
      console.log('path', path)
      if (path === '/admin') {
        // path = '/user/list'
        this.$router.push('/user/list')
      }
      this.activeMenu = path
    }
  },
  watch: {
    //监听路由变化 让左侧的menu高亮
    $route: 'setActiveMenu'
  }
}
</script>

<style lang="less" scoped>
.home-container,
.home-content,
.home-aside,
.home-main,
.home-aside .menu {
  height: 100%;
}

.home-header {
  line-height: 60px;
  background-color: #b3c1cd;
  font-weight: bolder;
  .logo {
    min-width: 180px;
  }
  img {
    height: 60px;
    vertical-align: middle;
  }
  .title {
    text-align: center;
    color: #fff;
    font-size: 30px;
  }
  .logout {
    color: #b07a17;
  }
}

.home-aside {
  background-color: #d4dfe4;
}

.home-content {
  background-color: #eaeef1;
}
</style>
