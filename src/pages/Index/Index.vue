<template>
  <div class="index">
    <Header></Header>
    <Nav></Nav>
    <Tip class="tip"></Tip>

    <div class="content">
      <div class="left">
        <router-view></router-view>
      </div>
      <div class="right">
        <Social></Social>
        <Card type="Widget" mark="category"></Card>
        <Card type="Widget" mark="article"></Card>
      </div>
    </div>
    <ToTop></ToTop>
  </div>
</template>
<script>
import Common from '../Common/Common'
import Header from '@/component/Header/Header'
import Nav from '@/component/Nav/Nav'
import Tip from '@/component/Tip/Tip'
import ToTop from '@/component/ToTop/ToTop'
import Card from '@/component/Card/Card'
import Social from '@/component/Social/Social'
export default {
  components: {
    Common,
    Header,
    Nav,
    Tip,
    ToTop,
    Card,
    Social
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.content {
  max-width: 1226px;
  margin: 0 auto;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
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
.tip {
  margin-bottom: 10px;
}
.to-top {
  position: fixed;
  right: 20px;
  bottom: 70px;
}
</style>