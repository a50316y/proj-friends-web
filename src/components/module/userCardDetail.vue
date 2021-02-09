<template lang="pug">
  div.m-userProfile      
    div.m-userProfile_main
      div.m-userProfile_main_inner
        div.m-userProfile_main_inner_left
          div.m-userProfile_main_inner_left_base
            div.m-userProfile_main_inner_left_title 
              span 基本資料
            dl.userProfile 
              dt.userProfile_title 年齡
              dd.userProfile_value {{ isNotAssign(form.age) }}
              dt.userProfile_title 身高
              dd.userProfile_value {{ isNotAssign(form.height) }}
              dt.userProfile_title 學歷
              dd.userProfile_value {{ isNotAssign(form.education) }}
              dt.userProfile_title 居住地
              dd.userProfile_value {{ isNotAssign(form.city) }}
              dt.userProfile_title 職業
              dd.userProfile_value {{ isNotAssign(form.career) }}
          div.m-userProfile_main_inner_left_talk
            div.m-userProfile_main_inner_left_title.h-bb-0 
              span 自我介紹文                
            div.m-userProfile_main_inner_left_talkvalue
              p {{ isNotAssign(form.info) }}                                             
        div.m-userProfile_main_inner_right
          album(:photo="form.photo" :disabled="disabled" :name="form.name" :age="form.age")
      div.m-userProfile_main_bottom.h-flex
        div.h-width-10.h-p-6(v-if="!applied")
          a( @click="isLike('2')" class="btn btn-unlike rounded-pill btn-block") 不喜歡  
        div.h-width-10.h-p-6(v-if="!applied")
          a( @click="isLike('1')" class="btn btn-like rounded-pill btn-block") 喜歡
        div.h-width-20.h-p-6(v-if="applied")  
          a( class="btn btn-secondary rounded-pill btn-block disabled") 已申請   
</template>

<script>
import album from "@/components/module/album.vue";
export default {
  name: 'userCardDetail',
  components: {
    album
  },    
  props:{
    form:{
        type:Object,
        default: function () {
          return { 
            account: '', //帳號不能修改
            name: '',
            male:'1', //0 woman ,1 man
            age:'',
            height:'',
            career:'',
            city:"",
            education:"",
            bloodType:'',
            photo:[],
            info:"",
            _id:""
          }
        }
    },
    applied:{
      type:Boolean,
      default:false
    }     
  },
  data () {
    return {     
        disabled:true
    }
  },
  computed:{ 
    showChatBox() { // 是否開啟聊天室
      return {
      }
    },      
  },
  methods: {    
    closePop(){ //關掉modal
      this.$emit('close','close');
    },
    isNotAssign(item){ //如果還未填寫資料 回傳'未填寫',
      if(item == '')
        return '未填寫'
      else
        return item
    },      
    isLike(like){
      const config = {
        headers:{ //Customer header 
          'content-Type':'application/json',
          'Authorization': this.$store.state.userToken
        }
      }

      try { //取得user資料
        let dataForm = {
          UserId:this.$store.state.userId,
          ToUserId:this.form._id,
          status:like        
        };

        const post = this.axios.post('/data/apply/userIsLike', dataForm,config)
        .then((res) => { 
          if(res.data.code == 1){
            let data = res.data.data;
            console.log(res.data);
            this.$bvToast.toast(`交友申請已送出`, {
              title: '',
              variant:'success',
              autoHideDelay: 1000,
              solid: true,
            })
            setTimeout(() => {
              this.$emit('close','ApplySuccess');  
            }, 1500)                          
          }
          else{ 
            console.log(res.data.msg);     
            // this.$store.state.isLoading = false;             
          }
          })
        .catch((err) => { console.log(err) })
      } catch (err) {
        throw new Error(err);
        console.log(err); 
        // this.$store.state.isLoading = false;                
      } 
    }     
  }
    
}
</script>

<style >

</style>
