<template>
  <div class="category">
    <div class="title">
      <i class="iconfont icon-fenlei"></i>
      <span>分类:</span>
      <span>{{name}}</span>
      <i class="iconfont icon-wifi"></i>
    </div>
    <p class="ins">{{name}}</p>
  </div>
</template>
<script>
import { caseCategoryEnToCh } from '@/utils/'
export default {
  props: ['cname'],
  computed: {
    name() {
      return caseCategoryEnToCh(this.cname)
    }
  }
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