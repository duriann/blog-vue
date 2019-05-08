<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="user-list-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/user/list' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>分类管理</el-breadcrumb-item>
          <el-breadcrumb-item>分类列表</el-breadcrumb-item>
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
    <el-row>
      <el-button type="primary" @click="addDialogVisible = true">新增</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%;margin-top: 10px;">
      <el-table-column label="操作" width="200" fixed>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column label="id" width="60" prop="id"></el-table-column>
      <el-table-column label="分类名" width="180" prop="name"></el-table-column>
      <el-table-column label="是否是导航" width="180" prop="isNav"></el-table-column>
      <el-table-column label="排序号" width="180" prop="sort"></el-table-column>
      <el-table-column label="等级" width="180" prop="level"></el-table-column>
      <el-table-column label="父级id" width="180" prop="parentId"></el-table-column>
      <el-table-column label="父级url" width="180" prop="parentUrl"></el-table-column>
      <el-table-column label="url" width="180" prop="url"></el-table-column>
      <el-table-column label="创建时间" min-width="200" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" min-width="200" prop="updateTime"></el-table-column>
    </el-table>
    <el-col>
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        @current-change="pageHandle"
      ></el-pagination>
    </el-col>

    <!-- 添加分类 -->
    <el-dialog title="添加分类" :visible.sync="addDialogVisible" :width="'35%'">
      <el-form :rules="addFormRules" ref="addForm" :model="addForm" label-width="100px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类url" prop="url">
          <el-input v-model="addForm.url" autocomplete="off" placeholder="/admin"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" prop="parentId">
          <el-select v-model="addForm.parentId" placeholder="请选择父级分类">
            <el-option v-for="pc in parentCategory" :key="pc.id" :label="pc.name" :value="pc.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序号" prop="sort">
          <el-input-number v-model="addForm.sort" controls-position="right" :min="1" :max="999"></el-input-number>
        </el-form-item>
        <el-form-item label="是否导航" prop="isNav">
          <el-select v-model="addForm.isNav" placeholder="请选择">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategory('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      keyword: '',
      currPage: 1,
      pageSize: 5,
      totalCount: 0,
      addDialogVisible: false, //是否显示添加对话框
      addForm: {
        //表单域
        name: '',
        url: '',
        isNav: '',
        level: 0,
        sort: 0,
        parentId: '',
        parentUrl: ''
      },
      addFormRules: {
        //表单验证
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入分类url', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        isNav: [{ required: true, message: '请选择', trigger: 'change' }],
        parentId: [{ required: false }],
        parentUrl: [{ required: false }],
        sort: [
          {
            type: 'number',
            required: true,
            message: '请输入排序号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    //添加分类
    async addCategory(formName) {
      try {
        await this.$refs[formName].validate()
        console.log('addForm', this.addForm)
        let { name, isNav, level, sort, parentId, parentUrl } = this.addForm
        if (parentId) {
          //如果有父级id 需要传父级url 以及修改等级为1
          parentUrl = this.tableData.filter(item => item.id === parentId)[0].url
          level = 1
        }
      } catch (e) {}
    },
    pageHandle(currPage) {
      this.getCategorys(currPage)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    async getCategorys(currPage = 1) {
      const res = await this.$http.get('/admin/category/listByPage', {
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
  computed: {
    parentCategory() {
      return this.tableData.filter(item => item.level === 0)
    }
  },
  mounted() {
    this.getCategorys()
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