<template>
  <div class="tip">
    <span class="info"><i class="iconfont icon-volume"></i> There are questions remain, We'll search for the answers together. But one thing we known for sure,the future is not set!</span>
    <span class="login"><i class="iconfont icon-gerenzhongxin1"></i>登录</span>
  </div>
</template>
<script>
export default {

}
</script>
<style lang='less' scoped>
.tip {
  height: 40px;
  color: #666;
  padding: 0 20px;
  line-height: 40px;
  background-color: #fbfbfb;
  display: flex;
  justify-content: space-between;
}
.info {
  i {
    color: #56af45;
  }
}
.login {
  color: #00a67c;
  cursor: pointer;
  i {
    color: gray;
    font-size: 20px;
    vertical-align: middle;
  }
}
</style>
