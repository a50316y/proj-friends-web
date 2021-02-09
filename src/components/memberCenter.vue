<template lang="pug">
  div.p-member
    div.p-member_main
      div.p-member_main_left
        album(:photo="form.photo")
      div.p-member_main_center
        div.p-member_userStatus
          div.p-member_userStatus_title
            p 會員狀態 / 帳號
            a(class="btn btn-outline-primary btn-sm h-ml-2 rounded-pill") 加值
          p.p-member_userStatus_para 免費會員 / {{ form.account }}
        div.p-member_userStatus
          div.p-member_userStatus_title
            p 會員名稱
            div
              div(v-if="editName")
                a( class="btn btn-outline-danger btn-sm h-ml-2 rounded-pill" @click="cancelText('name')" ) 取消
                a( class="btn btn-outline-primary btn-sm h-ml-2 rounded-pill" @click="finishText('name')" ) 完成
              a( v-else class="btn btn-outline-secondary btn-sm h-ml-2 rounded-pill" @click="clickText('name')") 編輯
          div.p-member_userStatus_Name
            b-input( v-if="editName" maxlength="10" id="Name" v-model="form.name" placeholder="輸入名稱")
            p(v-else class="p-member_userStatus_para") {{ form.name }}               
        div.p-member_userApply
          div.p-member_userApply_title
            p 交友申請
          div.p-member_userApply_list
            div.noneUserList(v-if="!applyList.length") 沒有交友申請了
            ul.userList(v-else)
              li.userItem(v-for="(user,index) in applyList" :key="index")
                div.userItem__avatar
                  img(:src="user.avatar")
                div.userItem__intro
                  p.name {{user.name }} 
                  p.age {{user.age + '歲'}}      
                div.userItem__button
                  font-awesome-icon(class="circle" :icon="['fas', 'check-circle']" @click="applyOk(user.UserId)")
                  font-awesome-icon(class="times h-ml-3" :icon="['fas', 'times-circle']" @click="applyNo(user.UserId)")                                        
      div.p-member_main_right      
        div.p-member_userProfile
          p.p-member_userProfile_title 點擊各項目，即可進行編輯
          p.p-member_userProfile_subtitle 
            span 詳細個人資料   
          div.p-member_userProfile_detail  
            div.detail_left 
              ul            
                li
                  p.p_title 身高
                  p.p_value(@click="clickDrop('height')") {{ isNotAssign(form.height) }}
                  userUpdatePop(v-if="drop == 'height'" :option="'height'" @closeDrop="closeDrop" @update="refresh" :formData="form")                                    
                li
                  p.p_title 年紀
                  p.p_value(@click="clickDrop('age')") {{ isNotAssign(form.age) }}
                  userUpdatePop(v-if="drop == 'age'" :option="'age'" @closeDrop="closeDrop" @update="refresh" :formData="form")                                                
                li
                  p.p_title 學歷
                  p.p_value(@click="clickDrop('education')") {{ isNotAssign(form.education) }} 
                  userUpdatePop(v-if="drop == 'education'" :option="'education'" @closeDrop="closeDrop" @update="refresh" :formData="form")                        
                li
                  p.p_title 性別
                  p.p_value(@click="clickDrop('gender')") {{ isNotAssign(gender) }} 
                  userUpdatePop(v-if="drop == 'gender'" :option="'gender'" @closeDrop="closeDrop" @update="refresh" :formData="form")                                                       
            div.detail_right
              ul
                li
                  p.p_title 居住地
                  p.p_value(@click="clickDrop('city')") {{ isNotAssign(form.city) }}
                  userUpdatePop(v-if="drop == 'city'" :option="'city'" @closeDrop="closeDrop" @update="refresh" :isDropLeft="true" :formData="form")                        
                li
                  p.p_title 血型
                  p.p_value(@click="clickDrop('bloodType')") {{ isNotAssign(form.bloodType) }}
                  userUpdatePop(v-if="drop == 'bloodType'" :option="'bloodType'" @closeDrop="closeDrop" @update="refresh" :isDropLeft="true" :formData="form")                         
                li
                  p.p_title 職業
                  p.p_value(@click="clickDrop('career')") {{ isNotAssign(form.career) }}
                  userUpdatePop(v-if="drop == 'career'" :option="'career'" @closeDrop="closeDrop" @update="refresh" :isDropLeft="true" :formData="form")                     
        div.p-member_talk
          div.p-member_talk_header 
            div.p-member_talk_title
              font-awesome-icon(class="icon_edit" :icon="['fas', 'pen-square']") 
              p 自我介紹文 ( 100字內 )
            div(v-if="editIntro")
              a( class="btn btn-outline-danger btn-sm h-ml-2 rounded-pill" @click="cancelText('intro')" ) 取消
              a( class="btn btn-outline-primary btn-sm h-ml-2 rounded-pill" @click="finishText('intro')" ) 完成
            a( v-else class="btn btn-outline-secondary btn-sm h-ml-2 rounded-pill" @click="clickText('intro')" ) 編輯
          div.p-member_talk_para
            b-form-textarea(v-if="editIntro"  maxlength="100" id="textarea" v-model="form.info" placeholder="輸入自我介紹..." rows="4"
             no-resize)
            p(v-else) {{isNotAssign(form.info)}}          

              
    

</template>

<script>
import axios from 'axios'
import album from "@/components/module/album.vue";
import userUpdatePop from "@/components/module/userUpdatePop.vue";
import { mapState,mapMutations } from "vuex";
export default {
  name: 'index2',
  components: {
    album,
    userUpdatePop
  },  
  inject: ['reload'],
  data () {
    return {
      headers:{ //Customer header 
        'content-Type':'application/json',
        'Authorization': this.$store.state.userToken
      },      
      msg: '',
      form: {
        account: '',
        name: '',
        photo:[],
        male:'1', //0 woman ,1 man
        age:'',
        city:"",
        height:'',
        career:'',
        bloodType:'',
        education:"",
        info:""
      },   
      drop:"",// 點哪個dropdown
      editName:false,//編輯名字
      editIntro:false,// 點擊編輯自我介紹文  
      applyList:[],//申請列表   
    }
  },
  computed: {
    ...mapState({
      isLoading:'isLoading'
    }),
    gender(){
      if(this.form.male == 1)
        return '男'
      else
        return '女'
    },
  },  
  methods:{    
    isNotAssign(item){ //如果還未填寫資料 回傳'未填寫',
      if(item == '')
        return '未填寫'
      else
        return item
    },    
    clickDrop(item){ // 點哪個dropdown
      this.drop = item;
    },
    closeDrop(){ //關掉dropdown
      this.drop = "";
    },
    clickText(item){ //編輯名字,自我介紹
      if(item == 'intro') // 點擊自我介紹
        this.editIntro = true;
      if(item == 'name')
        this.editName = true; //點擊編輯名字
    },
    cancelText(item){ //取消編輯
      if(item == 'intro') // 自我介紹
        this.editIntro = false;
      if(item == 'name')
        this.editName = false; //名字
    },    
    async finishText(item){ // 完成編輯自我介紹,名字

      this.$store.state.isLoading = true;  

      if(item == 'intro') // 完成編輯自我介紹
        this.editIntro = false;
      if(item == 'name') // 完成編輯名字
        this.editName = false;

      const config = {
        headers:this.headers
      }

      try {
        let dataForm = this.form; //修改傳入所有欄位
        delete dataForm.photo;
        Object.assign(dataForm,{userId: this.$store.state.userId})

        const post = await this.axios.post('/data/users/update', dataForm,config)
        .then((res) => { 
          if(res.data.code == 1){  
            this.$bvToast.toast(`更新成功`, {
              title: '',
              variant:'success',
              autoHideDelay: 1000,
              solid: true,
            })    

            setTimeout(() => {
              this.reload(); 
              this.$store.state.isLoading = false;
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
    applyOk(UserId){
     const config = {
        headers:this.headers
      }

      try { //取得user資料
        let dataForm = {
          UserId:this.$store.state.userId,
          ToUserId:UserId,
          status:"1"        
        };

        const post = this.axios.post('/data/apply/userIsLike', dataForm,config)
        .then((res) => { 
          if(res.data.code == 1){
            let data = res.data.data;
            this.$bvToast.toast(`交友申請已送出`, {
              title: '',
              variant:'success',
              autoHideDelay: 1000,
              solid: true,
            })
            setTimeout(() => {
              this.refresh();
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
    },
    applyNo(UserId){
     const config = {
        headers:this.headers
      }

      try { //取得user資料
        let dataForm = {
          UserId:this.$store.state.userId,
          ToUserId:UserId,
          status:"2"        
        };

        const post = this.axios.post('/data/apply/userIsLike', dataForm,config)
        .then((res) => { 
          if(res.data.code == 1){
            let data = res.data.data;
            this.$bvToast.toast(`你不喜歡了此人`, {
              title: '',
              variant:'danger',
              autoHideDelay: 1000,
              solid: true,
            })
            setTimeout(() => {
              this.refresh();
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
    },
    GetUserData(){ //取得user資料
      const config = {
        headers:this.headers
      }

      try {
        let dataForm = {
          userid: this.$store.state.userId,
        };

        const post = this.axios.post('/data/users/user', dataForm,config)
        .then((res) => { 
          if(res.data.code == 1){
            this.form = res.data.data;
            console.log(this.form)
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
    },    
    GetApplyList(){ //取得申請列表
      const config = {
        headers:this.headers
      }
      try { //取得user資料
        let dataForm = {
          UserId: this.$store.state.userId,
        };

        const post = this.axios.post('/data/apply/ApplyList', dataForm,config)
        .then((res) => { 
          if(res.data.code == 1){
            this.applyList = res.data.data;
            console.log(this.applyList)
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
    },
    refresh(){ //選染組件(page)
       this.reload(); 
        // location.reload() //刷新整個頁面
       this.$store.state.isLoading = false;
    }
  },
  created (){
      this.GetUserData();
      this.GetApplyList();      
  }      
}
</script>

<style scoped>

</style>
