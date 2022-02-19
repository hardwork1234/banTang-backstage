<template>
  <div class="ceshi">
      <h4>
          我是测试组件  我要把数据传给兄弟 学生组件
      </h4>
      <span>这是我接收到的数据:</span>
      <button @click="toStudent">传给学生组件</button>
      
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
export default {
    data(){
        return{
            name:'tianbiao',
            age:31,
            firstname:'',
            lastname:'',
        }
    },
    mounted () {
      
   
    },
    computed: {
       
        
    },
    methods: {
       toStudent(){
        // 全局事件总线实现兄弟组件数据共享   this.$bus.$emit('passStudent','我是测试组件')
        //消息订阅与发布实现兄弟组件数据共享 pubsub.publish('hello','我是测试组件qwerty')
        this.$store.commit('PassName',this.name)
       }
    }

}
</script>

<style>
.ceshi{
    background-color: cornflowerblue;
}

</style>