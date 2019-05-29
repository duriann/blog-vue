<template>
  <div class="social">
    <a href="#">
      <i class="iconfont icon-weibo"></i>
    </a>
    <a href="https://github.com/bolosea" target="_blank">
      <i class="iconfont icon-github-outline"></i>
    </a>
    <a href="#">
      <i class="iconfont icon-weixin"></i>
      <img class="wx" src="./wx.jpg" alt>
    </a>
    <a href="#">
      <i class="iconfont icon-qq"></i>
      <img class="qq" src="./qq.jpg" alt>
    </a>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.social {
  display: flex;
  background-color: #fff;
  justify-content: space-evenly;
  a {
    width: 45px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    padding: 10px 6px;
    background-color: #fff;
    position: relative;
    &:hover img {
      display: block;
    }
    .wx,
    .qq {
      width: 123px;
      height: 123px;
      position: absolute;
      top: 65px;
      left: -35px;
      display: none;
    }
    i {
      display: block;
      height: 100%;
      font-size: 30px;
      color: #fff;
      border-radius: 5px;
      background-color: yellowgreen;
    }
    .icon-weibo {
      background: #f78585;
    }
    .icon-weixin {
      background: #6fc299;
    }
    .icon-github-outline {
      background: #eca3ac;
    }
    .icon-qq {
      background: #e74c3c;
    }
  }
}
</style>