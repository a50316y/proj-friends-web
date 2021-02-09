<template lang="pug">
  div.p-login
    loading(:active.sync="isLoading" :can-cancel="true" :is-full-page="true" background-color="transparent" :opacity="opacity")
    div.p-loginCard
      div.h-mt-15
        font-awesome-icon( :icon="['fas', 'crow']" class="h-font-xxl" )         
      h2.h-mt-6 Please sign in
      ValidationObserver( v-slot="{ handleSubmit }" ref="form") 
        form( @submit.prevent="handleSubmit()" )
          ValidationProvider(name="account" rules="required" v-slot="{ failed, errors }")
            input(type="text" class="form-control" id="account" name="account" v-model="form.account" :class="{ 'is-invalid': failed }"  placeholder="請輸入帳號" @keyup="checkChinese()")
            span.text-danger.h-font-s.text-left {{ errors[0] }}
          ValidationProvider(name="Password" rules="required|max:12|min:6" v-slot="{ failed, errors }")  
            input(type="password" class="form-control" id="Password" name="Password" v-model="form.password" :class="{ 'is-invalid': failed }" placeholder="請輸入密碼")
            span.text-danger.h-font-s.text-left {{ errors[0] }}
          b-button( type="submit" block variant="primary" class="h-mt-10" @click="veeCheck()") Submit


</template>

<script>
import { mapState,mapMutations } from "vuex";

export default {
  name: 'login',
  data () {
    return {
      opacity:0,
      form:{
        account:'',
        password:'',
      }
    }
  },
  computed: {
    ...mapState({
      isLoading:'isLoading',
      isNotificationToggled:"isNotificationToggled"
    })
  },  
  methods: {
    ...mapMutations({
      setAuth: "setAuth",
    }),    
    veeCheck(){ //檢查表單
      this.$store.state.isLoading = true;
      this.$refs.form.validate().then(result => {
        if (result) {
          this.onSubmit();
        } else {
          this.$bvToast.toast('表單尚未填完', {
            title: '',
            variant:'danger',
            autoHideDelay: 5000,
            solid: true,
          })  
        }  
      });      
    },    
    async onSubmit() { //call login api  
      const config = {
        headers:{ //Customer header 
          'content-Type':'application/json',
          'Authorization':'someToken'
        }
      }

      try {
        let dataForm = {
          account: this.form.account,
          password: this.$md5(this.form.password),
        };

        const post = await this.axios.post('/data/users/login', dataForm,config)
        .then((res) => { 
          if(res.data.code == 1){
            let data = res.data.data;   
            this.setAuth({userToken:data.token,isLogin:true,userId:data.userId,avatar:data.avatar,
                          userName:data.userName});

            this.$bvToast.toast(`登入成功`, {
              title: '',
              variant:'success',
              autoHideDelay: 1500,
              solid: true,
            })    

            setTimeout(() => {
              this.$store.state.isLoading = false;
              this.$router.push({ path: '/index2' });
            }, 3000)

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
        .catch((err) => { 
          console.log(err) ;
          this.$bvToast.toast('登入失敗', {
            title: '',
            variant:'danger',
            autoHideDelay: 1500,
            solid: true,
          })
          this.$store.state.isLoading = false; 
        })
      } catch (err) { 
        throw new Error(err);
        this.$bvToast.toast('登入失敗', {
          title: '',
          variant:'danger',
          autoHideDelay: 1500,
          solid: true,
        })
        this.$store.state.isLoading = false;                
      }
    },    
    checkChinese(){ //帳號禁止輸入中文
      this.form.account = this.form.account.replace(/[\u4e00-\u9fa5]/ig,'');
    }      
  }  
}
</script>

<style >

</style>
