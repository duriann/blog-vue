<template>
  <div class="index">
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
import Common from "../Common/Common";
import Header from "@/component/Header/Header";
import Nav from "@/component/Nav/Nav";
import Tip from "@/component/Tip/Tip";
import ToTop from "@/component/ToTop/ToTop";
export default {
  components: {
    Common,
    Header,
    Nav,
    Tip,
    ToTop
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
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