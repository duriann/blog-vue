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
          <el-select
            v-model="addForm.parentId"
            clearable
            placeholder="请选择父级分类"
            @change="parentHanderChange"
          >
            <el-option v-for="pc in parentCategory" :key="pc.id" :label="pc.name" :value="pc.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序号" prop="sort">
          <el-input-number v-model="addForm.sort" controls-position="right" :min="1" :max="999"></el-input-number>
        </el-form-item>
        <el-form-item label="是否导航" prop="isNav">
          <el-select
            v-model="addForm.isNav"
            placeholder="请选择"
            :disabled="addForm.parentId?true:false"
          >
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideAddForm">取 消</el-button>
        <el-button type="primary" @click="validate('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { treeToList } from '@/utils'
export default {
  data() {
    return {
      allCategorys: [], //所有分类 list结构
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
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入分类url', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
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
    hideAddForm() {
      this.$refs['addForm'].resetFields()
      this.addDialogVisible = false
    },
    //当有选择父级分类的时候 导航需要设置为0(非导航) 并且不可修改
    parentHanderChange(e) {
      console.log('select parent value', e)
      //这里加''的原因是  是否导航的option 中的value是字符串类型的 设置成同样类型的以后 elementui会自动将lebel(否)显示在select上 而不是显示数字0
      this.addForm.isNav = 0 + ''
    },
    //表单验证
    async validate(formName) {
      try {
        await this.$refs[formName].validate()

        let {
          name,
          isNav,
          url,
          level,
          sort,
          parentId,
          parentUrl
        } = this.addForm
        console.log('this.addForm', this.addForm, this.tableData)
        if (parentId) {
          //如果有父级id 需要传父级url 以及修改等级为1
          this.addForm.parentUrl = this.allCategorys.filter(
            item => item.id === parentId
          )[0].url
          this.addForm.level = 1
        }
        this.addForm.isNav = isNav - 0 //转行成number类型
        this.addForm.url = url.startsWith('/') ? url : '/' + url
        console.log('addForm', this.addForm)
        this.addCategory(this.addForm)
      } catch (e) {
        console.log(e)
      }
    },
    //添加分类
    async addCategory(addForm) {
      console.log('addCategory', addForm)
      let res = await this.$http.post('/admin/category/add', {
        ...addForm
      })
      console.log('add category res', res)
      let { code, msg } = res.data
      if (code === 0) {
        this.$message({
          type: 'success',
          message: msg
        })
      } else {
        this.$message.error(msg)
      }
      this.hideAddForm()
      this.getCategorys(this.currPage)
    },
    //分页handle
    pageHandle(currPage) {
      this.currPage = currPage
      this.getCategorys(currPage)
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row)
      row.isNav += '' //为了让select框的value显示 否
      this.$nextTick(() => {
        this.addForm = Object.assign({}, row)
      })
      this.addDialogVisible = true
    },
    //删除
    async handleDelete(index, row) {
      console.log(index, row)
      try {
        await this.$confirm('此操作将永久删除该分类, 是否继续?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        let res = await this.$http.post('/admin/category/delete', {
          id: row.id
        })
        if (res.data.code === 0) {
          this.getCategorys(this.currPage)
          return this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
        this.$message({
          type: 'error',
          message: '删除失败QAQ'
        })
      } catch (e) {
        console.log(e)
      }
    },
    //分页获取所有分类
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
        // this.currPage += 1
        this.totalCount = data.totalCount
        this.tableData = data.pages
      }
    },
    //不分页获取所有一级分类 为了添加分类的时候找父级分类的url
    async getAllCategory() {
      if (this.$store.state.category.length === 0) {
        await this.$store.dispatch('getCategory')
      }

      console.log('this.$store.state.category', this.$store.state.category)
      this.allCategorys = treeToList(this.$store.state.category)
    }
  },

  computed: {
    parentCategory() {
      return this.allCategorys.filter(
        item => item.level === 0 && item.isNav !== 1
      )
    }
  },
  mounted() {
    this.getCategorys()
    this.getAllCategory()
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