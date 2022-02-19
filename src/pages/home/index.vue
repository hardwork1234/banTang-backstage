<template >
  
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header>
        <div class="header">
         <span
            >半糖网后台管理系统</span
          >
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!-- 页面主体区域 -->
      <el-container class="show1">
        <!-- 侧边栏 -->
        <el-aside class="aside">
          <!-- el-menu 是关于导航菜单的布局容器 -->
          <!-- 下面是关于控制激活颜色背景色的属性 下去后要思考组件的复用性自己封装组件根据
          不同的需求来实现通用性  这个el-menu是在是太有用了可以控制只有一个列表展开 和路由跳转-->
          <div id="toggle-button">|||</div>
          <el-menu class="menu"
            background-color="#505355"
            text-color="#fff"
            active-text-color="#f40"
            unique-opened router :default-active='activePath'
          >
          <!-- el-submenu 是一级菜单的布局容器其中temeplate是包含内容的模板 -->
          <!-- 必须给下面的 index绑定唯一 的key值才可以否则所有的菜单都会同开同闭
          而且key值必须是字符串 -->
            <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
              <template slot="title">
                <!-- 图标 -->
                <i :class="icons[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
              </template>

              <!-- el-menu-item 是二级菜单的容器 temeplate是包含内容的模板-->
              <!-- 二级菜单循环的时候是循环上一级的item谨记谨记 -->
              <el-menu-item :index=" '/' +subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
                <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
             
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧内容主体 -->
        <el-main>
          <router-view class="show"></router-view>
        </el-main>
      </el-container>
    </el-container>
 
</template>

<script>
export default {
  data(){
    return{
      menulist:[],
      activePath:'',
      icons:{
        '125':'iconfont icon-user',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao'

      }
    }
  },
  // 下面的方法是关于退出功能的实现，先清除token然后通过编程路由导航到/login
  // 生命周期函数创建的时候获取数据列表
  created(){
    this.getMenuList()
    // 下面是关于高亮的显示，当点击的时候创建sessionstorsge组件创建的时候给sctivePath赋值sessionstorsge
    this.activePath=window.sessionStorage.getItem('activePath')
    

  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList(){
     const {data:res} = await this.$http.get('menus')
     if(res.meta.status !==200) return this.$message.error(res.meta.msg)
     this.menulist = res.data
     console.log(res)
    },

    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)

    }
  },
};
</script>

<style scoped>
#toggle-button{
  margin:0 auto;
  width:100%;
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;

}


.menu{
  border-right:none;
}
.aside{
  text-align: left;
}
.home-container {
 height:100%;
 
}
.home-container .header{
  display: flex;
  align-items: center;
}
.home-container div span {
  margin-left: 15px;
}
.show1{
  overflow:hidden;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: grey;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 30px;
}
.el-aside {
  background-color: #505355;
}
.el-main {

  background-color: #acb9cc;
}
</style>
