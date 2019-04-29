<template>
  <div class="login">
    <h1 class="title">后台管理</h1>
    <div class="content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input name="username" placeholder="请输入账号" v-model="ruleForm.username" clearable/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            name="password"
            placeholder="请输入密码"
            v-model="ruleForm.password"
            show-password
            clearable
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login('ruleForm')">登录</el-button>
          <el-button @click="hideLoginModal">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import jsencrypt from 'jsencrypt'
var encrypt = new JSEncrypt()
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getPublicKey() {
      const res = await this.$http.get('/user/getPublicKey')
      let publicKey = res.data
      encrypt.setPublicKey(publicKey)
    },
    async login(ruleForm) {
      await this.getPublicKey()
      try {
        //这边使用try-catch以后 可以不必判断validate的返回值，当校验不通过的时候，会自然进到catch代码块中
        await this.$refs[ruleForm].validate()

        const res = await this.$http.post('/user/login', {
          username: this.ruleForm.username,
          password: encrypt.encrypt(this.ruleForm.password)
        })
        console.log(res)
        const { code, msg, data } = res.data
        if (code === 1) {
          return this.$message({
            message: msg,
            type: 'error'
          })
        }

        this.$message({
          message: msg,
          type: 'success'
        })

        this.$emit('setuser', data.name)
        this.hideLoginModal()
        localStorage.setItem('user', JSON.stringify(data))
      } catch (e) {
        this.$message({
          message: '用户名或者密码不能为空!',
          type: 'error'
        })
        console.error(e)
      }
    },

    hideLoginModal() {
      this.$destroy()
      this.$store.commit('hideLogin')
    },
    bindKeyDown(e) {
      if (e.keyCode === 13) {
        //回车
        this.login('ruleForm')
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.bindKeyDown)
  },
  destroyed() {
    window.removeEventListener('keydown', this.bindKeyDown)
  }
}
</script>
<style lang="less" scoped>
.login {
  width: 400px;
  height: 350px;
  background-color: #63d1b4;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.title {
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #dbe6e3;
  text-align: center;
  line-height: 60px;
  font-size: 19px;
  color: #ffffff;
}
.content {
  padding: 20px;

  & /deep/ .el-input {
    margin-bottom: 20px;
  }
}
</style>