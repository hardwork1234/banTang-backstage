<template>
  <div>
      <div class="banner">易购后台管理系统</div>
      <el-card class="box-card">
        <el-form  label-width="0px">
          <!-- 用户名 -->
          <el-form-item >
          <el-input  prefix-icon='el-icon-user-solid'> </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item >
          <el-input  prefix-icon='el-icon-s-cooperation'></el-input>
          </el-form-item>
          
          <!-- 按钮 -->
          <el-form-item class="btbotton">
         <el-button type="primary">登录</el-button>
         <el-button type="info">重置</el-button>
          </el-form-item>
          

      </el-form>
  
      </el-card>

  </div>
</template>

<script>
export default {

}
</script>

<style  scoped>
.banner{
  font-size:30px;
  margin-top:100px;
}
.box-card{

  width:600px;
  margin:0 auto;
  margin-top:20px;
}
.btbotton{
  margin-top:50px;
  margin-bottom:0px;
}
</style>>

</style>