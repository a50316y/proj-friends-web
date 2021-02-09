<template lang="pug">
  div.p-register
    div.p-registerCard
      h2 Sign up
      div
        ValidationObserver( v-slot="{ handleSubmit }" ref="form")  
          form( @submit.prevent="handleSubmit()" )
            div(class="form-row") 
              ValidationProvider(name="account" class="col-md-6" rules="required" v-slot="{ failed, errors }")
                div(class="form-group")
                  label(for="account")  會員帳號:
                  input(type="text" class="form-control" id="account" name="account" v-model="form.account" :class="{ 'is-invalid': failed }"  placeholder="Your Account" @keyup="checkChinese()")
                  span.text-danger.h-font-s {{ errors[0] }}
              ValidationProvider(name="Name" class="col-md-6" rules="required" v-slot="{ failed, errors }")    
                div(class="form-group") 
                  label(for="Name") 會員名稱:
                  input(type="text" class="form-control" id="name" name="Name" v-model="form.name" :class="{ 'is-invalid': failed }" placeholder="Your Name")
                  span.text-danger.h-font-s {{ errors[0] }}
            div(class="form-row") 
              ValidationProvider(name="Password" class="col-md-6" rules="required|max:12|min:6" vid="confirmation" v-slot="{ failed, errors }")
                div(class="form-group")
                  label(for="Password")  會員密碼:
                  input(type="password" class="form-control" id="Password" name="Password" v-model="form.password" :class="{ 'is-invalid': failed }" placeholder="Your password" required)
                  span.text-danger.h-font-s {{ errors[0] }}   
              ValidationProvider(name="checkPassword" class="col-md-6" rules="required|confirmed:confirmation" v-slot="{ failed, errors }")              
                div(class="form-group")
                  label(for="checkPassword") 確認密碼:
                  input(type="password" class="form-control" id="checkPassword" name="checkPassword" v-model="form.checkPassword" :class="{ 'is-invalid': failed }" placeholder="Your password" required)
                  span.text-danger.h-font-s {{ errors[0] }}   
            div(class="form-row")
              ValidationProvider(name="name" class="col-md-6" rules="required|max_value:120" v-slot="{ failed, errors }")    
                div(class="form-group")
                  label(for="age") 年紀:
                  input(type="Number" class="form-control" id="age" name="age" v-model="form.age" placeholder="Your age" required)   
                  span.text-danger.h-font-s {{ errors[0] }}  
              div(class="form-group col-md-6")
                div.h-width-12.h-mb-2                     
                  label(for="input-6") 姓別:
                div(class="form-check form-check-inline h-ml-1")
                  input(class="form-check-input" type="radio" name="maleRadio" v-model="form.male" id="maleRadio1" value="1") 
                  label(class="form-check-label" for="maleRadio1")  男
                div(class="form-check form-check-inline")
                  input(class="form-check-input" type="radio" name="maleRadio" v-model="form.male" id="maleRadio2" value="0")
                  label(class="form-check-label" for="maleRadio2") 女  

      div
        b-button(type="submit" block variant="outline-primary" @click="veeCheck()") 註冊

</template>

<script>

export default {
  name: 'register',
  data () {
    return {
        userAccount: '',
        userPassword: '',
        info:{},
        form: {
          account: '',
          password:'',
          checkPassword:'',
          name: '',
          male:'1', //0 woman ,1 man
          age:'',
        },        
    }
  },
  methods: {
    veeCheck(){ //檢查表單
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
    async onSubmit() { // call 註冊api 真正的送出  
      try {
        let dataForm = {
          account: this.form.account,
          password: this.$md5(this.form.password),
          male:this.form.male,
          name:this.form.name,
          age:this.form.age
        };

        const post = await this.axios.post('/data/users/register', dataForm)
        .then((res) => { 
          if(res.data.code == 1){
            console.log(res.data);     
            this.$bvToast.toast(`註冊成功，即將前往登入頁面`, {
              title: '',
              variant:'success',
              autoHideDelay: 1500,
              solid: true,
            })  
            setTimeout(() => {
              this.$router.push({ path: '/login' });      
            }, 3000)            
              
          }
          else{ 
            this.$bvToast.toast(res.data.msg, {
              title: '',
              variant:'danger',
              autoHideDelay: 1500,
              solid: true,
            })             
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
