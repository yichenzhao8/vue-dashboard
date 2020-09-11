<template>
<el-container>
  <el-main>
  <div>
  <span style="vertical-align: -webkit-baseline-middle; font-size :2rem">{{checks.machine}}</span>
  <el-button :style="color" circle style="margin-left:20px"></el-button>
  </div>
  </el-main>
</el-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      checks:[]
    }
  },
  mounted: function() {
    axios
      .get('http://localhost:9090/check_record')
      .then((response)=>{
        console.log(response.data)
        this.checks=response.data
      })
      .catch((err)=>{
        console.error(err);
      })
  },
  computed:{
     color(){
       return this.checks.status? {background:'#67c23a'} :{background :'#f56c6c'};
     }
  }
}
</script>

<style lang="scss" scoped>
  .el-button{
    padding:18px
  }
</style>

