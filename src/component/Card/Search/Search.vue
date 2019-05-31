<template>
  <div class="search">
    <h3 v-if="keyword">有关【{{keyword}}】的内容</h3>
    <h3 v-else>oh no, 没有查询到相关文章QAQ</h3>
  </div>
</template>
<script>
export default {
  props: ['keyword'],
  computed() {}
}
</script>
<style lang="less" scoped>
.search {
  padding-left: 20px;
  height: 45px;
  background-color: #fbfbfb;
  margin-bottom: 1px;
  font-size: 22px;
  line-height: 45px;
  color: #7a6f6f;
  font-weight: normal;
}
</style>