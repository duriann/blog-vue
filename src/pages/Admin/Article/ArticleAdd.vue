
<template>
  <div class="article_add">
    <el-row>
      <el-col>
        <el-input v-model="title" placeholder="请输入文章标题"></el-input>
      </el-col>
    </el-row>

    <el-row v-loading="quillUpdateImg">
      <el-col>
        <!-- 图片上传组件辅助-->
        <el-upload
          class="avatar-uploader"
          :action="serverUrl"
          name="file"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :before-upload="beforeUpload"
        ></el-upload>
        <quill-editor @change="onEditorChange($event)" ref="myQuillEditor" :options="editorOption"></quill-editor>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="1.5">
        <el-tag type="default">分类</el-tag>
      </el-col>
      <el-col :span="4">
        <el-cascader
          :options="categories"
          v-model="selectedCategory"
          :props="selectProps"
          size="small"
        ></el-cascader>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4" :offset="8">
        <el-button size="small" type="primary" plain @click="addActicle">发表</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
import hljs from 'highlight.js'
import { quillEditor, Quill } from 'vue-quill-editor'

//这边因为使用了webpack4的uglifyjs-webpack-plugin 压缩js啥的 导致这边不能用 需要从node_modules中拷贝一份出来本地引入
// import { ImageDrop } from 'quill-image-drop-module'
import ImageDrop from './ImageDrop'

import ImageResize from 'quill-image-resize-module'

Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)

const toolbarOps = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ header: 1 }, { header: 2 }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],
  [{ direction: 'rtl' }],
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ['clean'],
  ['link', 'image', 'video']
]
export default {
  data() {
    return {
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示

      serverUrl:
        process.env.NODE_ENV === 'production'
          ? '/file/upload'
          : '/api/file/upload', // 这里写你要上传的图片服务器地址
      content: '', //文章内容
      title: '', //文章标题
      categories: [], //文章分类
      selectedCategory: [], //选中的文章分类
      selectProps: {
        //用于设置级联选择展示的label和值
        label: 'name',
        value: 'id'
      },
      editorOption: {
        modules: {
          imageDrop: true,
          toolbar: {
            container: toolbarOps, // 工具栏
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          },
          syntax: {
            highlight: text => {
              return hljs.highlightAuto(text).value // 这里就是代码高亮需要配置的地方
            }
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          }
        }
      }
    }
  },
  components: {
    quillEditor
  },

  methods: {
    onEditorChange(e) {
      this.content = e.html
      console.log('this,content', this.content)
    },
    // 上传图片前
    beforeUpload(res, file) {
      // 显示loading动画
      this.quillUpdateImg = true
    },
    // 上传图片成功
    uploadSuccess(res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill

      console.log('res', res)
      // 如果上传成功
      if (res.code === 0) {
        // 获取光标所在位置
        let length = quill.getSelection().index
        // 插入图片  res.info为服务器返回的图片地址
        console.log('res.data', res.data)
        quill.insertEmbed(length, 'image', 'http://localhost:7777/' + res.data)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        this.$message.error('图片插入失败')
      }
      // loading动画消失
      this.quillUpdateImg = false
    },
    // 上传图片失败
    uploadError(res, file) {
      // loading动画消失
      this.quillUpdateImg = false
      this.$message.error('图片插入失败')
    },
    async getCategory() {
      if (this.$store.state.category.length === 0) {
        await this.$store.dispatch('getCategory')
      }

      console.log('this.$store.state.category', this.$store.state.category)
      this.categories = this.getTreeData(
        this.$store.state.category.filter(item => item.isNav === 0)
      )
    },
    getTreeData(data) {
      console.log('getTreeData', data)
      // 循环遍历json数据
      for (var i = 0; i < data.length; i++) {
        if (data[i].children === undefined || data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children)
        }
      }
      return data
    },
    //添加文章
    async addActicle() {
      const res = await this.$http.post('/admin/article/add', {
        title: this.title,
        content: this.content,
        categoryId: this.selectedCategory.slice(
          this.selectedCategory.length - 1,
          this.selectedCategory.length
        )[0]
      })
      if (res.data.code === 0) {
        console.log(this)
        this.$router.push('/article/list')
      } else {
        this.$message.error('发表失败!')
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted() {
    this.getCategory()
  }
}
</script>
<style lang="less" scoped>
.article_add {
  & /deep/ .ql-container {
    min-height: 400px;
  }
  & /deep/ input {
    border-radius: 0;
  }
  & /deep/ .ql-editor {
    min-height: 400px; //修复设置了min-height后 编辑器空白区域不可点击
  }
}
</style>