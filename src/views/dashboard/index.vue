<template>
  <el-container>
   <div class="count">
      <el-backtop ></el-backtop>
      <el-header style="margin-top:30px;">
        <el-form :inline="true" @submit.prevent="errorSend">
          <el-form-item label="Error Record">
            <el-input   v-model.trim="formData.input_" clearable placeholder="請輸入錯誤代碼"></el-input>
          </el-form-item>
          <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="選擇日期"
            value-format="yyyy-MM-dd-HH-mm-ss">
          </el-date-picker>
          <el-button type="primary" @click="errorSend(); fetchdata();" style="margin-left:10px" > 提交 </el-button>
        </el-form>

        <transition-group
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          
        >
       <el-alert
          :key="error"
          v-for=" error in errors"
          :title="error"
          type="error"
          :closable="false"
          center
          show-icon>
          {{error}}
       </el-alert>
        </transition-group>

      <transition-group  
           v-on:before-enter="beforeEnter"
           v-on:enter="enter"
           
      >
        <el-alert
        :key="1"
        v-if="show"
        title="submit success"
        type="success"
        :closable="false"
        show-icon
        center>
        </el-alert>
      </transition-group>
      </el-header>
      
      
      <el-main style="margin-top:50px">
        <label class="el-form-item__label">History Record </label>
        <el-date-picker
          v-model="value2"
          type="daterange"
          range-separator="至"
          start-placeholder="開始日期"
          end-placeholder="結束日期"
          value-format="yyyy-MM-dd"  
            >
        </el-date-picker>
        <el-button type="primary" @click="sendSearch()" style="margin-left:10px" > 查詢 </el-button>

        <el-table
          
          v-loading="listLoading"
          :data="records"
          element-loading-text="Loading"
          border
           highlight-current-row
          style="width:100%;
          margin-top:30px
          "
        >
          <el-table-column label="使用者" prop="account">
          </el-table-column>
          <el-table-column label="錯誤代碼"  prop="input_">
          </el-table-column>
          <el-table-column label="時間"  prop="error_time">
          </el-table-column>
        </el-table>  
      </el-main>

  </div>

  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
//import Vuex from "vuex";
import axios from "axios";
import Velocity from 'velocity-animate';
 
 var records =[]
 var errors =[]
export default {
  name: 'count',
  data(){
    return{
      errors:[],
      records:[],
      formData:{
         'input_':'',
         'time_':''
      },
      show:false,
      value1:'',
      value2:'',
      listLoading: true
     }
  },
   methods: {
  	errorSend() {
      this.errors=[]
      if(!this.formData.input_){
        this.errors.push('請輸入錯誤代碼')
        console.log(this.errors)
      }
      if(!this.value1){
        this.errors.push('請輸入日期')
        console.log(this.errors)

      }
      if(this.formData.input_&&this.value1){
         console.log(this.value1)
      let formData = new FormData()
      formData.set('input_', this.formData.input_)
      formData.set('time_', this.value1)
      console.log(formData)
       axios({
        method:'post',
        url:'http://localhost:9090/note_file',
        data:formData
      })
   
      this.formData.input_='';
      this.value1='';
      this.show=true;
      }
     },
     sendSearch:function(){
       console.log(this.value2[0])
       console.log(this.value2[1])

      let formData =new FormData()
      formData.set('oldtime',this.value2[0])
      formData.set('youngtime',this.value2[1])
      axios
      .post('http://localhost:9090/note_record_time',formData)
      .then(function (response) {
          console.log(response)
          // this.records = response.data
          // this.listLoading = false
       })
      .catch(function(err){
        console.error(err)
      })
     },
     beforeEnter:function(el){
       el.style.opacity=0
     },
     enter : function(el,done){
       Velocity(el,{opacity:1},{duratoin:300})
       setTimeout(()=>{
         Velocity(el,{opacity:0})
         this.show=false;
       },3000)
       Velocity(el,{opacity:1},{completed:done})

     },
     fetchdata: function(){
      axios
      .post('http://localhost:9090/note_record')
      .then(function (response) {
           this.records = response.data
          this.listLoading = false
      }.bind(this))
     } 
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
   created() {
     this.fetchdata()
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
 
 ::-webkit-input-placeholder, :-moz-placeholder, ::-moz-placeholder, :-ms-input-placehoder{
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Microsoft JhengHei, Arial, sans-serif;

 }
</style>
