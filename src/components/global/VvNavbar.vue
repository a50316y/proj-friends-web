<template lang="pug">
  nav.l-navbar
    div.l-navbar__logo(@click="toIndex()")
      img(src="@/assets/img/logo.png")
    div.h-flex  
      div
        div.l-navbar__icon.h-br-0( @click="toIndex()" id="target-2" :class="isActive('/index2')")
          font-awesome-icon(:icon="['fas', 'home']")    
        b-tooltip(target="target-2" triggers="hover" placement="bottom" variant="primary") 首頁           
      div.h-mr-4
        div.l-navbar__icon( @click="toMemberCenter()" id="target-1" :class="isActive('/memberCenter')")
          font-awesome-icon(:icon="['fas', 'user-edit']")
        b-tooltip(target="target-1" triggers="hover" placement="bottom" variant="primary") 會員中心           
      div.l-navbar__avatar(@click="toggleNotification({status: true})")
        img(v-if="avatar" :src="avatar")
        img(v-else src="@/assets/img/avatarNo.png")
        
</template>

<script>
import { mapState,mapMutations } from "vuex";
import VvNotification from "@/components/global/VvNotification.vue";

export default {
  name: 'VvNavbar',
  components: {
    VvNotification
  },  
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      avatar:"avatar",
    })
  },  
  methods:{
    ...mapMutations({
      toggleNotification: "toggleNotification",
    }),    
    isActive(url){ 
      let page =  this.$route.path;
      if(page == url)
        return 'isActive';
    },
    toMemberCenter() {
      let url = '/memberCenter';
      let page =  this.$route.path;
      if(url != page) //已在當前page 不再跳轉
        this.$router.push({ path: url });
    },
    toIndex() { //跳轉首頁
      let page =  this.$route.path;
      if(this.$store.state.isLogin == true && this.$store.state.userToken != null){
        if(page != '/index2') //已在當前page 不再跳轉
          this.$router.push({ path: '/index2' });
      }
      else{
        if(page != '/') //已在當前page 不再跳轉
          this.$router.push({ path: '/' });
      }
    },    
    check(){
       this.$store.state.isLoading = true;
       console.log(this.$store.state.isLoading);
    }    
  }
}
</script>

<style scoped>

</style>
