<template lang="pug">
  div.app
    vv-navbar
    vv-notification
    loading(:active.sync="isLoading" :can-cancel="true" :on-cancel="onCancel()" :is-full-page="true" background-color="transparent" :opacity="opacity") 
    div.l-main
      div.h-width-20
        router-view.l-main__page(v-if="isReloadAlive")

</template>

<script>
import VvNavbar from "@/components/global/VvNavbar.vue";
import VvNotification from "@/components/global/VvNotification.vue";
import { mapState,mapMutations } from "vuex";

export default {
  name: 'App',
  components: {
    VvNavbar,
    VvNotification,
  },
  provide() {
    return {
      reload: this.reload
    }
  },  
  data () {
    return {
      opacity:0,
      isReloadAlive : true,// call api時重新渲染component page使用
    }
  },
  computed: {
    ...mapState({
      isLoading:'isLoading'
    })
  },
  methods: {
    onCancel(){ //esc 點擊 取消lazy-loading
      this.$store.state.isLoading = false;  
    },
    reload() { //重新refresh component代替refresh page
			this.isReloadAlive = false;
			this.$nextTick(function(){
				this.isReloadAlive = true;
			});
		}

  }        
}
</script>
