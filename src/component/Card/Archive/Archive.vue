<template>
  <div class="archive">
    <div class="title">
      <h1>{{article.title}}</h1>
      <div class="meta">
        <router-link to>
          <span class="iconfont icon-fenlei">
            <span class="green">APP</span>
          </span>
        </router-link>
        <router-link to>
          <span class="iconfont icon-gerenzhongxin1">
            <span class="green">{{article.author}}</span>
          </span>
        </router-link>
        <span class="iconfont icon-shijian">2019-2-3</span>
        <router-link to>
          <span class="iconfont icon-pinglun">
            <span class="green">2评论</span>
          </span>
        </router-link>
      </div>
    </div>
    <div class="content">
      <div v-html="article.content"></div>
    </div>
    <Comment :comments="comments" :articleId="article.id" @getArticle="getArticle"></Comment>
  </div>
</template>
<script>
import Comment from '../../comment/Comment'

export default {
  components: {
    Comment
  },
  data() {
    return {
      article: {},
      comments: []
    }
  },
  methods: {
    async getArticle() {
      const res = await this.$http.get('/article/get', {
        params: {
          id: this.$route.params.id
        }
      })
      console.log('archive', res)
      if (res.data.code === 0) {
        this.article = res.data.data
        this.getComments(res.data.data.id) //当成功获取到文章的时候 再去请求该文章的评论
      }
    },
    async getComments(id) {
      const res = await this.$http.get('/comment/getById', {
        params: {
          id
        }
      })
      if (res.data.code === 0) {
        this.comments = res.data.data
      }
    }
  },
  mounted() {
    this.getArticle()
  }
}
</script>
<style lang="less" scoped>
.archive {
  background-color: #fff;
  height: auto;
  padding: 15px;
}
.title {
  border-bottom: 1px solid #eee;
  h1 {
    color: #444;
    font-weight: normal;
    font-size: 24px;
    line-height: 60px;
  }
  .meta {
    display: flex;
    margin-bottom: 10px;
    span {
      margin-right: 12px;
      color: #999;
    }
    span.green {
      color: #00a67c;
    }
  }
}
.content {
  padding: 12px 0 12px 0;
  color: #333333;
  font-size: 16px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}
</style>