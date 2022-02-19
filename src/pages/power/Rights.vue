<template>
  <!-- 上面的面包屑导航自己封装了一个组件就是通过 props属性进行传值就行也即是说可以对 饿了么UI库进行二次封装 -->
  <div>
    <Breadcrumb navone="权限管理" navtwo="权限列表"></Breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
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
      rightsList: [],
    };
  },
  components: { Breadcrumb },
  created() {
    this.getRightsList();
  },
  methods: {
    async getRightsList() {
      const { data: res } = await this.$http.get("rights/list");
      if (res.meta.status !== 200) {
        return this.$message("获取用户列表失败");
      }
      this.rightsList = res.data;
      console.log(this.rightsList);
    },
  },
};
</script>

<style lang="less" scoped></style>
