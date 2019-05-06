<template>
  <div class="article">
    <div class="title">
      <span class="category">
        <i></i>
        {{detail.category.name}}
      </span>
      <router-link class="router-title" :to="{path: '/archives/' + detail.id }">
        <span class="title-info">{{detail.title}}</span>
      </router-link>
    </div>
    <div class="content">
      <img
        class="headimg"
        v-if="!detail.headImg"
        src="http://www.baishujun.com/wp-content/themes/yusi1.0/timthumb.php?src=http://www.baishujun.com/wp-content/themes/yusi1.0/img/pic/6.jpg&h=123&w=200&q=90&zc=1&ct=1"
        alt
      >
      <img class="headimg" v-else :src="detail.headImg" alt>
      <div class="summary">
        <span class="summary-ins" v-html="detail.content.replace(/(<img.*?)>/g ,'')"></span>
        <p class="ins">
          <span>
            <i class="iconfont icon-iconfontgerenzhongxin"></i>
            {{detail.author}}
          </span>
          <span>
            <i class="iconfont icon-shijian"></i>
            {{formatTime(detail.createTime)}}
          </span>
          <span>
            <i class="iconfont icon-iconset0207"></i>62°C
          </span>
          <span>
            <i class="iconfont icon-weibiaoti-"></i>
            {{detail.totalComment}}评论
          </span>
          <!-- <span>
            <i class="iconfont icon-icon-test"></i>0喜欢
          </span>-->
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { getCreateTime } from '@/utils/'
export default {
  props: ['detail'],
  mounted() {},
  methods: {
    formatTime(time) {
      console.log('time', getCreateTime(time))
      return getCreateTime(time)
    }
  }
}
</script>
<style lang="less" scoped>
.article {
  padding: 20px;
  background-color: #fff;
  .title {
    display: flex;
    margin-bottom: 15px;
  }
  .category {
    position: relative;
    display: block;
    text-align: center;
    padding: 0 5px;
    height: 20px;
    color: #fff;
    background-color: #d9534f;
    i {
      position: absolute;
      right: -4px;
      top: 50%;
      transform: translateY(-50%);
      border-left: 4px solid #d9534f;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
    }
  }
  .router-title {
    width: auto;
  }
  .title-info {
    margin-left: 5px;
    font-size: 20px;
    color: #00a67c;
  }
  .content {
    display: flex;
    .headimg {
      height: 123px;
      width: 200px;
      margin-right: 20px;
    }
    .summary {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .summary-ins {
        height: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        & /deep/ img {
          width: 200px;
          height: 200px;
        }
      }
    }
    .ins {
      align-self: flex-end;
      span {
        color: #999;
        margin-right: 20px;
      }
    }
  }
}
</style>