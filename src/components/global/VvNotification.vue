<template lang="pug">
  aside.inbox( :class="showNotification()")
    header.inbox-header
      p.title {{ userName }}
      a( href="#" class="header-close" @click="toggleNotification({status: false})") 
        font-awesome-icon( :icon="['fas', 'times']" :style="{ color : 'white' }")
    div.inbox-body
      div.h-p-3.h-flex.inbox-body_state
        a( @click="outLogin()" class="btn btn-outline-primary btn-sm h-ml-2") 登出
        a(@click="toRegister()" class="btn btn-outline-primary btn-sm h-ml-2") 註冊
    div( class="h-p-3 h-width-20" :style="{ position: 'fixed', bottom: 0 }")
      div.h-flex.h-justify-content-center
        p Logo通過
        a(href="https://www.designevo.com/tw/logo-maker/" title="免費線上logo製作軟體") DesignEvo 
        p 設計製作    
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "VvNotification",
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      isNotificationToggled:"isNotificationToggled",
      isLogin:"isLogin",
      userToken:"userToken",
      userId:"userId",
      userName:'userName',
      isLoading:"isLoading",
      avatar:"avatar"
    })
  },
  methods: {
    ...mapMutations({
      toggleNotification: "toggleNotification",
      clearAuth:"clearAuth"
    }),
    showNotification() {
      return {
        "is-show": this.$store.state.isNotificationToggled
      }
    },
    toLogin() {
      this.$router.push({ path: '/login' });
      this.toggleNotification({status: false});
    },      
    outLogin(){
      this.clearAuth();
      this.toggleNotification({status: false});  
      this.$store.state.isLoading = false;
      this.$router.push({ path: '/' });  
    },
    toRegister() {
      this.$router.push({ path: '/register' });
      this.toggleNotification({status: false});
    },          
    toIndex2() {
      this.$router.push({ path: '/index2' });
      this.toggleNotification({status: false});
    },         
    printAll(){
      console.log('isLogin:' + this.isLogin, 'userToken:'+ this.userToken, 'userId:' + this.userId, 'isLoading:' + this.isLoading, 'avatar:' + this.avatar)
    }
  }
};
</script>

