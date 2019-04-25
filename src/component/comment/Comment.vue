<!--评论模块-->
<template>
  <div class="container">
    <div class="new-comment">
      <div class="new-head">
        <img class="avatar" src="../../assets/logo.png" alt>
        <textarea
          @focus="showAddHandle"
          placeholder="写下你的评论..."
          class="comment-content"
          cols="30"
          rows="10"
          v-model="inputComment"
        ></textarea>
      </div>
      <div class="btn-control" v-if="showAdd">
        <span class="cancel" @click="cancel">取消</span>
        <el-button class="btn" type="success" round @click="commitComment">确定</el-button>
      </div>
    </div>
    <div class="jingcai" v-if="comments.length>0">
      <span>精彩评论({{comments.length}})</span>
    </div>
    <div class="comment" v-for="item in comments" :key="item.id">
      <div class="info">
        <img class="avatar" :src="item.fromAvatar" width="36" height="36">
        <div class="right">
          <div class="name">{{item.username}}</div>
          <div class="date">{{item.createTime}}</div>
        </div>
      </div>
      <div class="content">{{item.content}}</div>
      <div class="control">
        <span class="like" :class="{active: item.isLike}" @click="likeClick(item)">
          <i class="iconfont icon-like"></i>
          <span class="like-num">{{item.likeNum > 0 ? item.likeNum + '人赞' : '赞'}}</span>
        </span>
        <!-- 回复子回复 -->
        <span class="comment-reply" @click="showCommentInput(item)">
          <i class="iconfont icon-comment"></i>
          <span>回复</span>
        </span>
      </div>
      <!-- 回复子回复中的回复 -->
      <div class="reply">
        <div class="item" v-for="reply in item.children" :key="reply.id">
          <div class="reply-content">
            <span class="from-name">{{reply.username}}</span>
            <span>:</span>
            <span class="to-name">@{{reply.parentName}}</span>
            <span>{{reply.content}}</span>
          </div>
          <div class="reply-bottom">
            <span>{{reply.createTime}}</span>
            <span class="reply-text" @click="showCommentInput(item, reply)">
              <i class="iconfont icon-comment"></i>
              <span>回复</span>
            </span>
          </div>
        </div>
        <div class="write-reply" v-if="item.children.length > 0" @click="showCommentInput(item)">
          <i class="el-icon-edit"></i>
          <span class="add-comment">添加新评论</span>
        </div>
        <transition name="fade">
          <div class="input-wrapper" v-if="showItemId === item.id">
            <el-tag v-if="replyName">{{replyName}}</el-tag>

            <el-input
              class="gray-bg-input"
              v-model="inputComment"
              type="textarea"
              :rows="3"
              autofocus
              placeholder="写下你的评论"
            ></el-input>
            <div class="btn-control">
              <span class="cancel" @click="cancel">取消</span>
              <el-button class="btn" type="success" round @click="commitComment">确定</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    comments: {
      type: Array,
      required: true
    },
    articleId: {
      required: true
    }
  },
  components: {},
  data() {
    return {
      inputComment: '',
      showItemId: '',
      showAdd: false,
      showItemName: '',
      replyName: ''
    }
  },
  computed: {},
  methods: {
    showAddHandle() {
      this.showAdd = true
    },
    /**
     * 点赞
     */
    likeClick(item) {
      if (item.isLike === null) {
        Vue.$set(item, 'isLike', true)
        item.likeNum++
      } else {
        if (item.isLike) {
          item.likeNum--
        } else {
          item.likeNum++
        }
        item.isLike = !item.isLike
      }
    },

    /**
     * 点击取消按钮
     */
    cancel() {
      this.inputComment = ''
      this.showItemId = ''
      this.showAdd = false
    },

    /**
     * 提交评论
     */
    async commitComment() {
      console.log(this.inputComment, this.articleId)
      let user = JSON.parse(localStorage.getItem('user'))
      console.log('user', user)
      if (!user) {
        return this.$message({
          type: 'error',
          message: '请先登录!'
        })
      }
      const res = await this.$http.post('/comment/add', {
        userId: user.id,
        articleId: this.articleId,
        content: this.inputComment,
        username: user.name || null,
        parentId: this.showItemId || null,
        parentName: this.showItemName || null
      })
      console.log(res)
      const { code, msg } = res.data
      if (code === 0) {
        this.$message({
          type: 'success',
          message: msg
        })
        this.$emit('getArticle')
        this.cancel()
      }
    },

    /**
     * 点击评论按钮显示输入框
     * item: 当前大评论
     * reply: 当前回复的评论
     */
    showCommentInput(item, reply) {
      if (reply) {
        this.replyName = '@' + reply.username + ' '
        this.showItemName = reply.username
      } else {
        this.inputComment = ''
        this.showItemName = item.username
      }
      console.log('item', item)
      this.showItemId = item.id
    }
  },
  created() {
    console.log(this.comments)
  }
}
</script>

<style scoped lang="less">
// @import "../../public/scss/index";
@color-main: #409eff;
@color-success: #67c23a;
@color-warning: #e6a23c;
@color-danger: #f56c6c;
@color-info: #909399;

@text-main: #303133;
@text-normal: #606266;
@text-minor: #909399; //次要文字
@text-placeholder: #c0c4cc;
@text-333: #333;

@border-first: #dcdfe6;
@border-second: #e4e7ed;
@border-third: #ebeef5;
@border-fourth: #f2f6fc;

@content-bg-color: #fff;

.container {
  padding: 0 10px;
  box-sizing: border-box;
  .new-comment {
    margin-bottom: 40px;

    display: flex;
    flex-direction: column;
    .btn-control {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-top: 10px;
      .cancel {
        font-size: 16px;
        color: @text-normal;
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          color: @text-333;
        }
      }
      .confirm {
        font-size: 16px;
      }
    }
    .new-head {
      display: flex;
    }
    .avatar {
      border: 1px solid #ddd;
      height: 38px;
      width: 38px;
      border-radius: 50%;
      margin-right: 20px;
    }

    .comment-content {
      padding: 10px 15px;
      width: 100%;
      height: 80px;
      font-size: 13px;
      border: 1px solid #dcdcdc;
      border-radius: 4px;
      background-color: hsla(0, 0%, 71%, 0.1);
      resize: none;
      display: inline-block;
      vertical-align: top;
      outline-style: none;
    }
  }

  .jingcai {
    padding-bottom: 20px;
    font-size: 17px;
    font-weight: 700;
    border-bottom: 1px solid #f0f0f0;
    color: #333;
  }

  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid @border-fourth;

    .info {
      display: flex;
      align-items: center;
      .avatar {
        border-radius: 50%;
      }
      .right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .name {
          font-size: 16px;
          color: @text-main;
          margin-bottom: 5px;
          font-weight: 500;
        }
        .date {
          font-size: 12px;
          color: @text-minor;
        }
      }
    }
    .content {
      font-size: 16px;
      color: @text-main;
      line-height: 20px;
      padding: 10px 0;
    }
    .control {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: @text-minor;
      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
        &.active,
        &:hover {
          color: @color-main;
        }
        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }
      .comment-reply {
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: @text-333;
        }
        .iconfont {
          font-size: 16px;
          margin-right: 5px;
        }
      }
    }
    .reply {
      margin: 10px 0;
      border-left: 2px solid @border-first;
      .item {
        margin: 0 10px;
        padding: 10px 0;
        border-bottom: 1px dashed @border-third;
        .reply-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: @text-main;
          .from-name {
            color: @color-main;
          }
          .to-name {
            color: @color-main;
            margin-left: 5px;
            margin-right: 5px;
          }
        }
        .reply-bottom {
          display: flex;
          align-items: center;
          margin-top: 6px;
          font-size: 12px;
          color: @text-minor;
          .reply-text {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;
            &:hover {
              color: @text-333;
            }
            .icon-comment {
              margin-right: 5px;
            }
          }
        }
      }
      .write-reply {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: @text-minor;
        padding: 10px;
        cursor: pointer;
        &:hover {
          color: @text-main;
        }
        .el-icon-edit {
          margin-right: 5px;
        }
      }
      .fade-enter-active,
      fade-leave-active {
        transition: opacity 0.5s;
      }
      .fade-enter,
      .fade-leave-to {
        opacity: 0;
      }
      .input-wrapper {
        padding: 10px;
        .gray-bg-input,
        .el-input__inner {
          /*background-color: #67C23A;*/
        }
        .btn-control {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 10px;
          .cancel {
            font-size: 16px;
            color: @text-normal;
            margin-right: 20px;
            cursor: pointer;
            &:hover {
              color: @text-333;
            }
          }
          .confirm {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>