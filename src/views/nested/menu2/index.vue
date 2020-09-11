<template>
  <div class="demo-image">

      
     <div  
     class="block"
     v-for="cat in info"
     v-loading="listLoading"
     element-loading-text="Loading">

    {{ cat.id }}:{{ cat.breed }}
  
    <span>{{cat.width}}</span>
    <span>{{cat.height}}</span>
    <div class="demo-image__preview">
      <el-image :src="cat.url"></el-image>
    </div>
  </div>
   </div> 
</template>

<script>
 import axios from 'axios'

  export default {
    data () {
        return {
          info: '',
          listLoading: true 
        }
      },
    mounted () {
      axios
        .get('https://api.thecatapi.com/v1/images/search')
        .then(
          response => (this.info = response.data),
          this.listLoading = false

         )
            
    }
  
    
  }
    
  // export default {
         
//         data: {
//             return {
//             image: { url: ""}
//             }
//         },
//         created(){
//             this.loadNextImage();
//         } ,
//         methods:{
//             async loadNextImage()
//             {
//                 try{
//                     axios.defaults.headers.common['x-api-key'] = "DEMO-API-KEY" // Replace this with your API Key

//                     let response = await axios.get('https://api.thecatapi.com/v1/images/search', { params: { limit:1, size:"full" } } ) // Ask for 1 Image, at full resolution
                    
//                     this.image = response.data[0] // the response is an Array, so just use the first item as the Image

//                     console.log("-- Image from TheCatAPI.com")
//                     console.log("id:", this.image.id)
//                     console.log("url:", this.image.url)

//                 }catch(err){
//                     console.log(err)
//                 }
//             }
//         }
//     }
  </script>