<template>
  
  <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{navone}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{navtwo}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    name:"Breadcrumb",
    props: ["navone","navtwo"]

}
</script>

<style>

</style>