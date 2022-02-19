 <template>
  <!-- 上面的面包屑导航自己封装了一个组件就是通过 props属性进行传值就行也即是说可以对 饿了么UI库进行二次封装 -->
  <div>
    <Breadcrumb navone="权限管理" navtwo="角色列表"></Breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
        <!-- 按钮区 -->
        <el-row>
            <el-col>
                <el-button type="primary">添加角色</el-button>
            </el-col>
        </el-row>
        <!-- 请求数据并渲染角角色列表区 -->
      <el-table :data="rolesList" border stripe>
          <!-- 展开列 -->
         <el-table-column type="expand"   >
           <template slot-scope="scope" >
             <el-row v-for="(item1,i1) in scope.row.children" :key="item1.id">
               <!-- 渲染一级权限 -->
               <el-col :span="5">
                 <el-tag>{{item1.authName}}</el-tag>
                 <i class="el-icon-caret-right"></i>
               </el-col>
               <!-- 渲染二级和三级权限 -->
               <el-col :span="19">
                 <el-row v-for="(item2,i2) in item1.children" :key="item2.id">
              
               <el-col :span="6">
                 <el-tag type="success">{{item2.authName}}</el-tag>
                 <i class="el-icon-caret-right"></i>
               </el-col>
               <el-col :span="18">
                 <el-tag type="warning"v-for="(item3,i3) in item2.children" :key="item3.id" closable 
                 @close="removeRightById()">{{item3.authName}}</el-tag>
                 
               </el-col>

                 </el-row>
                


               </el-col>
             </el-row>
           </template>
         </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <!-- 索引列 -->
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting">分配</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    
  </div>
</template>

<script>
import Breadcrumb from "../../components/Breadcrumb.vue";

export default {
  data() {
    return {
      rolesList: [],
     
    };
  },
  components: { Breadcrumb },
  created() {
    this.getRolesList();
  },
  methods: {
    async getRolesList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200) {
        return this.$message("获取用户列表失败");
      }
      this.rolesList = res.data;
      console.log(this.rolesList);
    },
   async removeRightById(){
      const confirmResult = await this.$confirm(
        '是否删除该权限 ，是否继续',
        {
          confirmButtonText:"确定",
          cancelButtonText:'取消',
          type:'warning'
        }
      ).catch(err =>err)
      console.log(confirmResult)
      if(confirmResult !== 'confirm'){
        return this.$message.info('取消删除操作')
      }
    }
  },
};
</script>

<style scoped>
.el-tag{
  margin:7px;
}


</style>
