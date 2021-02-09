<template lang="pug">
  div.p-mainIndex
    div.p-mainIndex_ground
      div.p-mainIndex_ground_header
        a( class="btn btn-outline-primary h-mr-4 rounded-pill" :class="{isActive:option == 'NotApplied'}" @click="isApply('NotApplied')" ) 未申請
        a( class="btn btn-outline-primary h-mr-4 rounded-pill" :class="{isActive:option == 'Applied'}" @click="isApply('Applied')" ) 已喜歡
      div.div.p-mainIndex_ground_inner
        userCard(v-for="(item,index) in all" :key="index" :form="item" :applied="applied" @apply="refresh")  
        p(v-if="all.length == 0 && !applied" class="noNew") {{ NoneListMsg }}      
        p(v-if="all.length == 0 && applied" class="noNew") {{ NoneListMsg }}
    div.p-mainIndex_aside 
      friendsList(@receive="openChatBox")
    chatBox( :chatId="ClickUserId" :chatName="Name" :chatAvatar="Avatar" :isChatBoxToggled="isOpen" @closeChat="closeChat")  

</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import axios from 'axios'
import chatBox from "@/components/module/chatBox.vue";
import friendsList from "@/components/module/friendsList.vue";
import userCard from "@/components/module/userCard.vue";
export default {
  name: 'index2',
  components: {
    chatBox,
    friendsList,
    userCard
  },  
  inject: ['reload'],
  data () {
    return {
      msg: "",
      ClickUserId:"",
      Name:"",
      Avatar:"",
      isOpen:false,
      all:[],//所有user list
      active:'1',
      option:'NotApplied',//未申請或已申請的user list
      applied:false,//未申請列表為false 申請列表為true
      NoneListMsg:"",//沒有交友申請或未申請列表時的說明文字
    }
  },
  methods:{
    ...mapMutations({
      clearAuth:"clearAuth"
    }),
    refresh(){ //選染組件(page)
       this.reload(); 
        // location.reload() //刷新整個頁面
       this.$store.state.isLoading = false;
    },    
    openChatBox(friend){
      console.log(friend);
      this.ClickUserId = friend.UserId;
      this.Name = friend.name
      this.Avatar = friend.avatar
      this.isOpen = true;
    },
    closeChat(){
      this.ClickUserId = "";
      this.Name = "";
      this.isOpen = false;
    },
    isApply(item){ //切換列表
      this.option = item;
      if(item == 'Applied'){
        this.applied = true;
      }
      else{
        this.applied = false;
      }
    },
    GetUser(){
     const config = {
       headers:{ //Customer header 
         'content-Type':'application/json',
         'Authorization': this.$store.state.userToken
       }
     }

     try { //取得user資料
       this.all = [];//初始化
       let dataForm = {
         userId: this.$store.state.userId,
         option:this.option
       };

       const post = this.axios.post('/data/users/getAllUser', dataForm,config)
       .then((res) => { 
         if(res.data.code == 1){
           this.all = res.data.data;
          //  console.log(this.all);
           if(this.all.length == 0){
             if(this.option == 'NotApplied')
               this.NoneListMsg = "暫時沒有新的朋友了"
             if(this.option == 'Applied') 
               this.NoneListMsg = "尚未有交友申請送出"
           }
         }
         else{ 
           if(res.data.msg === 'token過期或錯誤,請重新登入'){
             this.clearAuth();
             this.$bvToast.toast('請重新登入會員', {
                title: '',
                variant:'danger',
                autoHideDelay: 500,
                solid: true,
             })
             setTimeout(() => {
               location.reload();
             }, 1000)      
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
  },
  watch:{
    option(val){
      this.GetUser();         
    }
  },
  created () {
    this.GetUser();
  },  
}
</script>

<style scoped>

</style>
