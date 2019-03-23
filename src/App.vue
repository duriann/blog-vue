<template>
  <div id='app'>
    <Header></Header>
    <Nav></Nav>
    <div class="content">
      <Tip class="tip"></Tip>
      <router-view></router-view>
    </div>
    <ToTop></ToTop>
  </div>
</template>
<script>
import Header from './component/Header/Header.vue'
import Nav from './component/Nav/Nav.vue'
import Tip from './component/Tip/Tip'
import ToTop from './component/ToTop/ToTop'
export default {
  components: {
    Header,
    Nav,
    Tip,
    ToTop,
  }
}
</script>
<style lang="less">
.content {
  max-width: 1226px;
  margin: 0 auto;
  margin-bottom: 10px;
  .tip {
    margin-bottom: 10px;
  }
}
.to-top {
  position: fixed;
  right: 20px;
  bottom: 70px;
}
</style>