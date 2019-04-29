<template>
  <div class="front-end">
    <Common type="Category" :cname="cname" :isParent="false" :id="id"></Common>
  </div>
</template>
<script>
import Common from '../../Common/Common'
export default {
  props: ['id'],
  data() {
    return {
      cname: '' //分类名称 是根据main.js中的路由设置的
    }
  },
  methods: {},
  components: {
    Common
  },
  mounted() {
    this.cname = this.$route.params.name
  }
}
</script>
<style lang="less" scoped>
</style>
