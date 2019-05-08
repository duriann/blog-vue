<template>
  <div class="header">
    <h1 class="title">菠萝君</h1>
    <span class="ins">-藏匿于地球上的火星人，沉迷于开饭店的程序猿</span>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.header {
  height: 104px;
  background-color: #1abc9c;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 1s all;
  .title {
    font-size: 40px;
  }
  .ins {
    font-size: 24px;
  }
  &:hover {
    letter-spacing: 2px;
  }
}
</style>