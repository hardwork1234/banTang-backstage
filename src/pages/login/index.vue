<template>
  <div>
      <div class="banner">易购后台管理系统</div>
      <el-card class="box-card">
        <!-- 数据绑定v-model 数据的验证rules 数据的重置 ref this.$refs.loginFormRef.resetFields() -->
        <!-- 刚开始有的疑惑 就是输入框不能输入是因为没有数据绑定或者绑定错误 v-model='loginForm.username'-->
        
        <el-form ref='loginFormRef' label-width="0px" :model='loginForm' :rules="loginRules">
          <!-- 用户名 -->
          <el-form-item prop="username">
          <el-input  prefix-icon='el-icon-user-solid' v-model='loginForm.username' > </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
          <el-input  prefix-icon='el-icon-s-cooperation' v-model='loginForm.password' type='password'></el-input>
          </el-form-item>
          
          <!-- 按钮 -->
          <el-form-item class="btbotton">
         <el-button type="primary" @click='login'>登录</el-button>
         <el-button type="info" @click='resetLoginForm'>重置</el-button>
          </el-form-item>
          

      </el-form>
  
      </el-card>

  </div>
</template>

<script>
export default {
  data(){
    return{
      loginForm:{
        username:'',
        password:'',
      },
      loginRules: {
          username: [
            { required: true, message: '请输入你的名字', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 3到 9 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],},

    }
  },
  methods: {
    resetLoginForm(){
      // 获取表单的实例对像 调用方法进行重置
      this.$refs.loginFormRef.resetFields()
    },
    login(){
      this.$refs.loginFormRef.validate(
       async valid=>{
          if (!valid) return;
          const {data:res} = await this.$http.post('login',this.loginForm);
          // 这里使用了elementUI的消息提示框引入message组件这个有点特殊必须先挂在到原型中
          if(res.meta.status !==200 ) return this.$message.error('登录失败')
          this.$message.success('登陆成功');
          console.log(res.data);
          // 下面是点击登陆的时候把返回的数据去设置浏览器的sessionStorage方便下次登录，并且跳转页面
          window.sessionStorage.setItem('token',res.data.token);
          this.$router.push('/home');

        }
      )
    }
  }

}
</script>

<style  scoped>
.banner{
  font-size:30px;
  margin-top:100px;
}
.box-card{

  width:520px;
  margin:0 auto;
  margin-top:20px;
}
.btbotton{
  margin-top:50px;
  margin-bottom:0px;
}
</style>>

