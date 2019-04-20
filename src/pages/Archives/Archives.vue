<template>
  <div class="common">
    <div class="left">
      <Card type="Archive"></Card>
    </div>
    <div class="right">
      <Social></Social>
      <Card type="Widget"></Card>
      <Card type="Widget"></Card>
      <Card type="Widget"></Card>
    </div>
  </div>
</template>
<script>
import Card from '@/component/Card/Card'
import Social from '@/component/Social/Social'
export default {
  props: ['type', 'data'],
  data() {
    return {
      category: null
    }
  },
  methods: {},
  computed: {},
  mounted() {},
  components: {
    Card,
    Social
  }
}
</script>
<style lang="less" scoped>
.common {
  justify-content: space-between;
  display: flex;
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
</style>