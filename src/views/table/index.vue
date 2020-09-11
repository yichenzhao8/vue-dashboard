<template>
  <div class="app-container">
    <el-backtop ></el-backtop>
    <el-table
      v-loading="listLoading"
      :data="lists"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="使用者" width="110" prop="account">
      </el-table-column>
      <el-table-column label="檔名"  prop="filename">
      </el-table-column>
      <el-table-column label="狀態"  width="100" prop="status" >
       <template slot-scope="scope">
        <el-tag :type="scope.row.status === 'true' ?'primary':'success'"  disable-transitions>{{scope.row.status ? '正常' : '異常'}}</el-tag>  
      </template>
      </el-table-column>
      <el-table-column label="時間"  width="150" prop="time">
      </el-table-column>
      <el-table-column label="移除" width="80">
        <template slot-scope="scope">
           <el-button
          size="mini"
           @click="handleDelete(scope.$index, scope.row)">移除</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
 
<script>
import axios from 'axios'

 

export default {
  data() {
    return {
      lists: [],
      listLoading: true
    }
  },
  methods: {
      filterTag(value, row) {
        return row.status === value;
      },
      handleDelete(index, row) {
        var filename= row.filename
        var time = row.time
        console.log(filename);
        console.log(time)

        let formData = new FormData()
        formData.set('filename', filename)
        formData.set('time', time)

        axios.post('http://localhost:9090/delete_record', formData)
        .then(function (response) {
          console.log('dd')
        })
        .catch(function(err){
          console.error(err)
        })

      }
  },
  created() {
    axios
      .post('http://localhost:9090/file_record')
      .then(
        response => {
          this.lists = response.data
          this.listLoading = false
        })
  }
}
</script>
