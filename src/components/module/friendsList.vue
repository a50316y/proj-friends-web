<template lang="pug">
  div.m_userFriends_list
    ul.FriendsList
      li.FriendsItem(v-for="(item,index) in friends" :key="index" @click="openChatBox(item)")
        div.FriendsItem__avatar
          img(:src="item.avatar")
        div.FriendsItem__intro
          p {{ item.name }}   
    
</template>

<script>

export default {
  name: 'friendsList',
  components: {
  },    
  data () {
    return {     
      headers:{ //Customer header 
        'content-Type':'application/json',
        'Authorization': this.$store.state.userToken
      },         
      friends:[],
    }
  },
  computed:{
  },
  methods: {
    openChatBox(item){ //回傳點擊friend item
      this.$emit("receive", item);
    },
    GetFriends(){ //取得user資料
      const config = {
        headers:this.headers
      }

      try {
        let dataForm = {
          UserId: this.$store.state.userId,
        };

        const post = this.axios.post('/data/users/getFriendList', dataForm,config)
        .then((res) => { 
          if(res.data.code == 1){
            this.friends = res.data.data;
            console.log(this.friends)
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
  },
  created() {
    this.GetFriends();
  },      
}
</script>

<style >

</style>
