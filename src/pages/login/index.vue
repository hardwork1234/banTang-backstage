<template>
  <div class="bigbox" v-loading="loading">
   

  
    
     <div class="loading-wrapper" v-show="loadingData">
            <Loading></Loading>  
          </div>
          <div class="login-content"> 
            <div class="banner">{{getsonage}}后台管理系统</div>
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
         <el-button type="primary" @click='login'
          >登录</el-button>
         
         <el-button type="info" @click='resetLoginForm'>重置</el-button>
        
         
          </el-form-item>
          
          

      </el-form>
  
      </el-card>
          </div>
      
     
   

  </div>
</template>

<script>
import Loading from '../../components/Loading.vue'


export default {
  data(){
    return{
      times:10,
      getsonage:'半糖网',
      loadingData:false,
      loading:false,
      // loading的变量
       fullscreenLoading: false,
      loginForm:{
        username:'admin',
        password:'123456',
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
  beforeCreate () {
   
    
  },
  created (){
     
     console.log
  },
  mounted (){
   
    // this.$refs.son.$on('showage1',(a) =>{
    //   alert(a)
    // })
  //  this.getsonage = this.$refs.son.age
    // 使用mock 模拟数据 自己昨天看的不行啊，昨天的是自己写数据用node读取数据文件在请求
    // 今天学的比较简单使用 fastmock网站模拟接口，语法还是mock语法，网站自动生成路由
    // 我们只需要baseurl 和 自己定义的根路径就行了

//     const baseUrl =" https://www.fastmock.site/mock/c4e696a792f53a7c590a7c8c160e62d5/api";
// this.$http.get(`${baseUrl}/test`)
// //  其中 /test就是我们定义的根路径
// .then(({data}) =>{
//   console.log('data',data)

// })

  },
  components: {
    Loading,
   
  },
  methods: {
   
    // getage(age){
    //   this.getsonage = age

    // }
    // ,
     
   
     openFullScreen1() {
        this.fullscreenLoading = true;
        setTimeout(() => {
          this.fullscreenLoading = false;
        }, 2000)},
    resetLoginForm(){
      // 获取表单的实例对像 调用方法进行重置
      this.$refs.loginFormRef.resetFields()
    },
    login(){
      // 点击的时候加载 loading 图给最外层的盒子绑定 v-loading修饰符绑定变量loading
      // 还有一种方法是用v-show 当获取发送请求获取数据的时候隐藏
      // this.loading = true;
      this.loadingData = true;
      this.$refs.loginFormRef.validate(
        
       async valid=>{
         
          if (!valid) return;
          
          const {data:res} = await this.$http.post('login',this.loginForm);
          // 这里使用了elementUI的消息提示框引入message组件这个有点特殊必须先挂在到原型中
          if(res.meta.status !==200 ) return this.$message.error('登录失败')
          this.$message.success('登陆成功');
         
         
          window.sessionStorage.setItem('token',res.data.token);
          this.$router.push('/home');
           
          //  this.$http.interceptors.request.use(config=>{
          //  this.loading = true;
          //   return config
          // })
          // this.$http.interceptors.response.use(config=>{
          //   this.loading = false;
            
          // })
          // 下面是点击登陆的时候把返回的数据去设置浏览器的sessionStorage方便下次登录，并且跳转页面
         
          

        },
        
      )
    }
  }

}
</script>

<style  scoped>
.bigbox{
  background: lightgray;
  width:100%;
  height:100%;
  box-sizing: border-box;
  padding-top:100px;
}


.banner{
  text-align: center;
  font-size:30px;

}
.box-card{
background:lightslategray;
  width:520px;
  margin:0 auto;
  margin-top:20px;
}
.btbotton{
  text-align: center;
  margin-top:50px;
  margin-bottom:0px;
}
.loading-wrapper{
background:lightslategray;
  width:100%;
  height:100%;
  position:absolute;
  z-index: 5;
  top:50%;
  transform: translateY(-50%);
}
 
</style>>

