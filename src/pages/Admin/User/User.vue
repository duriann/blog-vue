<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="user-list-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/user/list' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
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
      <el-table-column label="id" width="60" prop="id"></el-table-column>
      <el-table-column label="用户名" width="180" prop="name"></el-table-column>
      <el-table-column label="创建时间" width="180" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" width="180" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
      this.getUsers(currPage)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    async getUsers(currPage = 1) {
      const res = await this.$http.get('/admin/user/listByPage', {
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
    this.getUsers()
  }
}
</script>
<style lang="less" scoped>
.user-list-breadcrumb {
  padding-left: 10px;
  line-height: 3;
  font-size: 14px;
  background-color: #d4dae0;
}
</style>