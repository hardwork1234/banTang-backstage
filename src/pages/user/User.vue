<template>
  <!-- 面包屑导航区 -->
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索与添加区 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 添加搜索功能绑定数据清空属性和清空要发送的方法 -->
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4"
          ><el-button type="primary" @click="addDialogVisible=true">添加用户</el-button></el-col
        >
      </el-row>
      <!-- 用户列表区域 -->
      <!-- 使用el-table来渲染用户列表区 column是列data绑定的是数据源 label是每一列的列首prop指定数据源的每一项
      boeder是边框线 stripe是斑马条纹隔行变色 -->
      <el-table :data="userlist" border stripe>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template slot-scope="scope">
            <!-- 修改用户状态把修改的数据同步到数据库中开关有一个 change事件接收这一行的数据参数传过去 -->
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <!-- 关于增删改查 -->
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
               @click="showEditDialog(scope.row.id)"
            ></el-button>
           <el-tooltip
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
             <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
           </el-tooltip>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button
            ></el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 关于分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%" @close="addDialogClosed"
      
    >
    <!-- 内容对话框主体内容区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px" >
  <el-form-item label="用户名" prop="username">
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="addForm.password"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="addForm.mobile"></el-input>
  </el-form-item>
  </el-form>
      <!-- 内容底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->


     <el-dialog
      title="修改用户"
      :visible.sync="  modifyUserVisble"
      width="50%" 
    >
    <!-- 内容对话框主体内容区域 -->
      <el-form :model="modifyUserFrom" :rules="addFormRules" ref="addFormRef" label-width="70px" >
  <el-form-item label="用户名" prop="username">
    <el-input v-model="modifyUserFrom.username" disabled></el-input>
  </el-form-item>
  
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="modifyUserFrom.email"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="modifyUserFrom.mobile"></el-input>
  </el-form-item>
  </el-form>
      <!-- 内容底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="  modifyUserVisble = false">取 消</el-button>
        <el-button type="primary" @click="changeUser"
          >确 定</el-button
        >
      </span>
    </el-dialog>



  </div>
</template>

<script>
export default {
  data() {
    // 下面是自定义的校验规则，写在data上面有点独特 然后再下面的规则中使用以下
  // validator使用规则
  // 邮箱的验证规则
    var checkEmail = (rule,value,cb)=>{
        const regEmail = /^([a-zZ-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if(regEmail.test(value)){
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
      }
      // 验证手机规则
      var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }
    return {


      // 获取用户列表的参数对象

      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      userlist: [],
      total: 0,
      addDialogVisible:false,

      // 添加用户的表单数据
       modifyUserVisble:false,
      //  修改用户的表单开关
      addForm:{
        username:'',
        password:'',
        email:'',
        mobile:'',
      },
      modifyUserFrom:{
         

      },
      // 添加表单的验证规则对象
     addFormRules:{
        username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '用户名在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 15, message: '密码在 6 到 15 个字符', trigger: 'blur' }
          ],
          email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 有下面两种方法进行数据请求第一种是使用async方法
    async getUserList() {
      // 使用async函数 await拿到的是成功的结果是 then 的语法糖
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });
      console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败");
      }
      this.userlist = res.data.users;
      this.total = res.data.total;
    },
    // 下面是关于分页的编写当选择几条每页时发生的事件 并且重新请求数据其中参数 newSize是当前的几条数据每页
    // 当选择第几页时发生的事件 并且重新请求数据其中参数 newPage是当前的页码数
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      console.log(newSize);
      this.getUserList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    // 修改用户状态保存到数据库中发送数据请求
    async userStateChange(userInfo) {
      console.log(userInfo);
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      );
      if (res.meta.status !== 200) {
        usetInfo.mg_state = !userInfo.mg_state;
        return this.$message.error("更新用户状态失败");
      }
      this.$message.success("更新用户状态成功");
    },
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
     addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.post('users', this.addForm)

        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败！')
        }

        this.$message.success('添加用户成功！')
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户列表数据
        this.getUserList()
      })
    },
    async removeUserById(id) {
      // 弹框询问用户是否删除数据
      console.log(id)
      const confirmResult = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }

      const { data: res } = await this.$http.delete('users/' + id)

      if (res.meta.status !== 200) {
        return this.$message.error('删除用户失败！')
      }

      this.$message.success('删除用户成功！')
      this.getUserList()
    },
   async showEditDialog(id){
     
     
       const { data: res } = await this.$http.get(
        'users/'+id
      );
      if (res.meta.status !== 200) {
        
        return this.$message.error("查询用户状态失败");
      }
       this.modifyUserVisble=true,
      this.modifyUserFrom=res.data
      

    },
    async changeUser(){
       const { data: res } = await this.$http.put(
        'users/'+this.modifyUserFrom.id,{
          email:this.modifyUserFrom.email,
          mobile:this.modifyUserFrom.mobile,
        }
      );
      if (res.meta.status !== 200) {
        
        return this.$message.error("修改用户状态失败");
      }
      this.modifyUserVisble=false,
      this.$message.success("修改用户状态成功")
      this.getUserList()


    },
   
  },
  // 关闭窗口修改用户的数据
  

  // // getUserList(){
  // //   this.$http.get('users',{params:this.queryInfo}).then(res =>{
  // //     console.log(res.data)
  // //   })
  // // }
  // }
};
</script>

<style scoped></style>
