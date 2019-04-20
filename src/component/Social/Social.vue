<template>
  <div class="social">
    <a href="#">
      <i class="iconfont icon-weibo"></i>
    </a>
    <a href="#">
      <i class="iconfont icon-youxiang"></i>
    </a>
    <a href="#">
      <i class="iconfont icon-weixin"></i>
    </a>
    <a href="#">
      <i class="iconfont icon-qq"></i>
    </a>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.social {
  display: flex;
  a {
    width: 45px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    padding: 10px 6px;
    background-color: #fff;
    i {
      display: block;
      height: 100%;
      font-size: 30px;
      color: #fff;
      border-radius: 5px;
    }
    .icon-weibo {
      background: #f78585;
    }
    .icon-weixin {
      background: #6fc299;
    }
    .icon-youxiang {
      background: #eca3ac;
    }
    .icon-qq {
      background: #e74c3c;
    }
  }
}
</style>