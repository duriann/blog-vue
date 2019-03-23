<template>
  <div class="category">
    <div class="title">
      <i class="iconfont icon-fenlei"></i>
      <span>分类:</span>
      <span>种业风云</span>
      <i class="iconfont icon-wifi"></i>
    </div>
    <p class="ins">关注蔬菜发展</p>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.category {
  height: 60px;
  background-color: #fff;
  padding: 10px 20px;
  margin-bottom: 1px;
  .title {
    font-size: 22px;
    color: #7a6f6f;
    font-weight: normal;
    i {
      width: 16px;
      font-size: 20px;
    }
    i.icon-wifi {
      color: #f58128;
    }
  }
  .ins {
    color: #666;
    margin-top: 10px;
  }
}
</style>