<template>
  <div class="widget">
    <h2 class="title">友情链接</h2>
    <ul class="items">
      <li>栽培网-关注栽培技术</li>
      <li>百蔬图-原创蔬菜图片</li>
      <li>百蔬网-专业蔬菜种子</li>
      <li>百蔬闻-关注蔬菜新闻</li>
    </ul>
  </div>
</template>
<script>
export default {

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
  li {
    height: 30px;
    line-height: 30px;
  }
}
</style>