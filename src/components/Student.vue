<template>
  <div class="student">
      <h4>
          我是学生组件  我要把数据传给兄弟 测试组件

      </h4>
      <span>这是我接收到的数据:{{$store.state.brname}}</span>
      <button >传给测试组件</button>
      <button @click="change">改变vuex中的数据</button>
      
  </div>
</template>

<script>
import pubsub from 'pubsub.js'
export default {
    data(){
        return{
           getname:'加一'
        }
    },
    mounted () {
        // 消息订阅与发布实现兄弟组件数据共享
        // this.pid = pubsub.subscribe('hello',(message,data)=>{
        //     this.getname=data
        // })
        // 全局事件总线实现兄弟组件数据共享
    //  this.$bus.$on('passStudent',(data)=>{
    //      this.getname=data
    //  })
    // 通过vuex实现数据共享
   
    },
    computed: {
        
        
    },
    methods: {
        change(){
            this.$store.commit('ChangeData',this.getname)
        }
      
    }

}
</script>

<style>
.student{
    background-color: rgb(105, 186, 211);
}

</style>