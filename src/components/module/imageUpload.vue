<template lang="pug">
  div.m-imgUpload
    div.m-imgUpload_header
      p 編輯相片
      font-awesome-icon(class="IconClose" :icon="['fas', 'times']" @click="closePop()")
    div.m-imgUpload_main
      div.imgContainer
        vueCropper( v-if="images.length" ref="cropper" :fixed="true" :centerBox="true" :autoCrop="true" :img="images[0]" :outputSize="option.size" :outputType="option.outputType")   
        p(v-else) 請上傳圖片後裁取
      div.imgOption
        div.imgTitle
          p 上傳照片後，左側將會預覽圖片，請裁取大小
        div.imgButton  
          label(class="btn btn-outline-secondary rounded-pill btn-block inputFile" )  上傳圖片
            input(id="upload_img" type="file" @change="OnInputChange" accept="image/*")
          a(@click="sketchImg()" v-if="images.length" class="btn btn-outline-info rounded-pill btn-block ") 送出  
          //- a(@click="sketchImg()" class="btn btn-outline-primary rounded-pill btn-block") 測試



    

</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import bg from '../../assets/img/friends.jpg'
export default {
  name: 'imageUpload',
  props:{
    text:{
      type:String
    },
    photo:{
      type: Array,
      default:[]
    },
    index:{
      type:Number,
      default:-1
    }
  },
  data () {
    return {     
      option:{
        size:1,
        outputType:'png',
        img:bg
      },
      file:[],
      images:[],//預覽用會轉成base64 type="base64"
      imagefiles: [], // 保存給formData用 type="file"
      img64:"",
      ImgURL:"",//回傳的圖片路徑
    }
  },
  mounted () {
  },  
  computed: {
    ...mapState({
      avatar:"avatar"
    })
  },
  methods: {
    ...mapMutations({
      swapAvatar: "swapAvatar",
    }),    
    closePop(){ //關掉modal
      this.$emit('close','close');
    },    
    OnInputChange(e) { //上傳圖片
      const files = e.target.files;
      this.images = []; //初始化
      this.imagefiles = [] //初始化

      // 將檔案加進圖像陣列中 並render
      // 因 files 類似於 Array 物件,須採用此寫法
      Array.prototype.forEach.call(files, fs => {
        if (!fs.type.match("image.*")) {
          //判斷是否為圖片檔
          alert(`${fs.name} 不是圖片檔, 請上傳圖片檔`);
          return;
        } 
        else {
          this.imagefiles.push(fs);
          const reader = new FileReader();
          reader.readAsDataURL(fs); //轉成base64
          reader.onload = e => this.images.push(e.target.result); 

        }
        console.log(this.images);

      });
    },
    sketchImg() { //擷取圖片後 寫入base64到img64在上傳
    this.$store.state.isLoading = true; 
      this.$nextTick(() => {
        this.$refs.cropper.getCropData((data) => {
          // console.log(this.blobToFile(this.dataURLtoBlob(data),'image')); 
          this.img64 = data;
          // console.log(this.img64);
          this.submit();
        })
      });
    },
    async submit(){ //先執行圖片上傳

      const config = {
        headers:{ //Customer header 
          'content-Type':'application/json',
          'Authorization': this.$store.state.userToken
        }
      }

      try {
        let dataForm = { //修改欄位
            image: this.img64
        };

        const post = await this.axios.post('/data/users/uploadImg', dataForm,config)
        .then((res) => { 
          if(res.data.code == 1){
            console.log(res);  
            this.ImgURL = res.data.data.url;
            this.updateImg();
          }
          else{ 
            alert('圖片上傳失敗')           
          }
         })
        .catch((err) => { console.log(err) })
      } catch (err) {
        throw new Error(err);
        alert(err)               
      }
    },   
    async updateImg(){ // 上傳圖片路徑到資料庫
      const config = {
        headers:{ //Customer header 
          'content-Type':'application/json',
          'Authorization': this.$store.state.userToken
        }
      }

      try {
        let dataForm = { //修改欄位
            photo: this.photo
        };
        Object.assign(dataForm,{userId: this.$store.state.userId})
        if(this.index == -1){
          dataForm.photo.push(this.ImgURL);
        }
        else
          dataForm.photo[this.index] = this.ImgURL;

        const post = await this.axios.post('/data/users/updateImg', dataForm,config)
        .then((res) => { 
          if(res.data.code == 1){
            console.log(res);    
            let data = res.data.data;
            this.$bvToast.toast(`圖片上傳成功`, {
              title: '',
              variant:'success',
              autoHideDelay: 1000,
              solid: true,
            })    

            setTimeout(() => {
              this.swapAvatar({avatar:data.photo[0]}); //如果有更換照片更換大頭貼
              this.$emit('close','update');  
            }, 1500)

          }
          else{ 
            this.$bvToast.toast(res.data.msg, {
              title: '',
              variant:'danger',
              autoHideDelay: 1500,
              solid: true,
            })
            this.$store.state.isLoading = false;             
          }
          })
        .catch((err) => { console.log(err) })
      } catch (err) {
        throw new Error(err);
        this.$bvToast.toast(err, {
          title: '',
          variant:'danger',
          autoHideDelay: 1500,
          solid: true,
        })
        this.$store.state.isLoading = false;                
      }

    },    
    dataURLtoBlob(dataurl) { //將base64轉成blob
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    },
    blobToFile(theBlob, fileName){//将blob转换为file
       theBlob.lastModifiedDate = new Date();
       theBlob.name = fileName + '-' + Date.now();
       return theBlob;
    }
  }  
}
</script>

<style >

</style>
