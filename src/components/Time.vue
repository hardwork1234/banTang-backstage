<template>
<div class="box">
        <span>请确认制作完成了吗？</span>
        <br><br><br>
        <div>
            <button class="sure"  :disabled="dis">确定{{time1}}</button><button class="cancle">取消</button>
        </div>
    </div>
  
</template>

<script>
export default {
    data(){
        return{
            dis:true,
            clock:null,
            time1:this.time,
            
     

        }
    },
    props: ['time'],
    created () {
      
        console.log(this)
     this.clock = setInterval(this.timer, 1000);
     
    },
    methods:{
        timer() {  
        this.time1--;
            if (this.time1 < 0) {
               
                clearInterval(this.clock)
                this.time1 = '';
                this.dis=false;

                
            }
            

        },
   
    },

}
</script>

<style scoped >
.box {
            background-color: lightgray;
            width: 300px;
            height: 200px;
            margin: 0 auto;
            padding-top: 50px;
        }
        
        button {
            display: inline-block;
            width: 100px;
            border-radius: 5px;
        }
        
        .sure {
            background-color: lightblue;
        }

</style>