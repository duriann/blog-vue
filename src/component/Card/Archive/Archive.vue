<template>
  <div class="archive">
    <div class="title">
      <h1>{{article.title}}</h1>
      <div class="meta">
        <router-link
          :to="category.parentUrl?category.parentUrl+category.url+`/${article.categoryId}`: category&&category.url+`/${article.categoryId}`"
        >
          <span class="iconfont icon-fenlei">
            <span class="green">{{category.name}}</span>
          </span>
        </router-link>
        <router-link to>
          <span class="iconfont icon-gerenzhongxin1">
            <span class="green">{{article.author}}</span>
          </span>
        </router-link>
        <span class="iconfont icon-shijian">{{formatDate(article.createTime)}}</span>
        <a href="#comment">
          <span class="iconfont icon-pinglun">
            <span class="green">{{comments.length}}评论</span>
          </span>
        </a>
      </div>
    </div>
    <div class="content">
      <div v-html="article.content" @click="test($event)"></div>
    </div>
    <Comment id="comment" :comments="comments" :articleId="article.id" @getArticle="getArticle"></Comment>
    <ImageViewer :img="img" ref="iv"></ImageViewer>
  </div>
</template>
<script>
import Comment from '../../Comment/Comment'
import moment from 'moment'
import ImageViewer from '../../ImageViewer/ImageViewer'

export default {
  components: {
    Comment,
    ImageViewer
  },
  data() {
    return {
      article: {},
      comments: [],
      category: {},
      img: ''
    }
  },
  methods: {
    test(e) {
      if (e.target.nodeName === 'IMG') {
        this.img = e.target
        this.$refs.iv.toggleShow()
      }
    },
    //获取文章
    async getArticle() {
      const res = await this.$http.get('/article/get', {
        params: {
          id: this.$route.params.id
        }
      })
      if (res.data.code === 0) {
        this.article = res.data.data
        this.category = this.article.category
        console.log('archive article', this.article)
        this.getComments(res.data.data.id) //当成功获取到文章的时候 再去请求该文章的评论
      }
      console.log('archive article2', this.article)
    },
    //获取评论
    async getComments(id) {
      const res = await this.$http.get('/comment/getById', {
        params: {
          id
        }
      })
      if (res.data.code === 0) {
        this.comments = res.data.data
        console.log('comments', this.comments)
      }
    },
    formatDate(time) {
      return moment(time).format('YYYY-MM-DD')
    }
  },
  watch: {
    //解决连续点击右侧文章不渲染问题
    '$route.path'(newVal) {
      this.getArticle()
    }
  },
  created() {
    this.getArticle()
  },
  mounted() {
    let imgs = document.querySelectorAll('img')
  }
}
</script>
<style lang="less" scoped>
.archive {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: auto;
  padding: 15px;
  pre,
  code {
    padding: 10px;
  }
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
  font-size: 16px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  & /deep/ img {
    width: 100%;
    height: 100%;
    cursor: zoom-in !important;
  }
}
</style>