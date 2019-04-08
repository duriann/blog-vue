<template>
  <div class="login">
    <h1 class="title">后台管理</h1>
    <div class="content">
      <el-input placeholder="请输入账号"
    v-model="username"
    clearable
    />
   
  <el-input placeholder="请输入密码" v-model="password" show-password clearable></el-input>

  <el-button type="danger" >登录</el-button>

  </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      username: '',
      password: ''
    }
  }
}
</script>
<style lang="less" scoped>
  .login{
    width: 400px;
    height: 350px;
    background-color: #63d1b4;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;
  }
  .title{
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #dbe6e3;
    text-align: center;
    line-height: 60px;
    font-size: 19px;
    color: #ffffff;
  }
  .content{
    padding: 20px;

    & /deep/ .el-input{
      margin-bottom: 20px;
    }
  }
  
</style>