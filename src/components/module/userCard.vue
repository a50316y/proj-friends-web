<template lang="pug">
  div(class="m-card" )
    div(class="m-img-container") 
      img( v-if="!form.photo.length" class="m-image" :src="NoImg" @click.stop="cardModal()")    
      img( v-else class="m-image" :src="form.photo[0]" @click.stop="cardModal()")
    div(class="m-card__body") 
      div.box_userinfo_title
        p.h-mr-2 {{form.city}}
        p {{form.age + '歲'}}
      div.box_userinfo_intro 
        p {{ isNotAssign(form.info) }}
      a( v-if="applied" class="btn btn-secondary rounded-pill btn-block disabled") 已申請    
      a( v-else @click="like()" class="btn btn-like rounded-pill btn-block") 喜歡  
      
    
</template>

<script>
import userCardDetail from "@/components/module/userCardDetail.vue";
export default {
  name: 'userCard',
  components: {
    userCardDetail 
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
    applied:{ // true 表示已申請過
      type:Boolean,
      default:false
    }     
  },
  data () {
    return {   
      NoImg:"static/avatarNo.png",  
    }
  },
  computed:{ 
    showChatBox() { // 是否開啟聊天室
      return {
      }
    },      
  },
  methods: {    
    isNotAssign(item){ //如果還未填寫資料 回傳'未填寫',
      if(item == '')
        return '未填寫'
      else
        return item
    },     
    cardModal(){
      this.$modal.show( userCardDetail, 
        { 
          text: 'This text is passed as a property',
          form:this.form,
          applied:this.applied
         },
        {
          width:'800px',
          height:'550px'
        },
        {
          'before-close':event => {
            if(event.params == 'ApplySuccess'){
              this.$emit('apply','success');  
            }
          }
        }        
      );
    },  
    like(){
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
          status:"1"        
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
              this.$emit('apply','success');  
            }, 1500)                          
          }
          else{ 
            console.log(res.data.msg); 
            if(res.data.msg === 'token過期或錯誤,請重新登入'){
              this.clearAuth();
              alert('請重新登入會員!!');
              setTimeout(() => {
                router.push({ path: '/login' });
              }, 500)      
            }
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
