<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="article-list-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/user/list' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章管理</el-breadcrumb-item>
          <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-input placeholder="请输入内容" v-model="keyword"></el-input>
      </el-col>

      <el-col :span="2">
        <el-button plain icon="el-icon-search">搜索</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%;margin-top: 10px;">
      <el-table-column fixed label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="id" width="60" prop="id"></el-table-column>
      <el-table-column label="标题" width="100" prop="title"></el-table-column>
      <el-table-column label="作者" width="80" prop="author"></el-table-column>
      <el-table-column label="评论id" width="60" prop="comment_id"></el-table-column>
      <el-table-column label="内容" width="180" prop="content" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="分类" width="100" prop="category_id"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" prop="updateTime"></el-table-column>
    </el-table>
    <el-col>
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        @current-change="pageHandle"
      ></el-pagination>
    </el-col>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      keyword: '',
      currPage: 1,
      pageSize: 2,
      totalCount: 0
    }
  },
  methods: {
    pageHandle(currPage) {
      this.getArticles(currPage)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    async getArticles(currPage = 1) {
      const res = await this.$http.get('/article/listByPage', {
        params: {
          keyword: this.keyword,
          currPage,
          pageSize: this.pageSize
        }
      })
      const { data, code } = res.data
      console.log(data, res)
      if (code === 0) {
        this.currPage += 1
        this.totalCount = data.totalCount
        this.tableData = data.pages
      }
    }
  },
  mounted() {
    this.getArticles()
  }
}
</script>
<style lang="less" scoped>
.article-list-breadcrumb {
  padding-left: 10px;
  line-height: 3;
  font-size: 14px;
  background-color: #d4dae0;
}
</style>