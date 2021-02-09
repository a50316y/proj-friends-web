<template lang="pug">
  div.container
    div.row.m-imgCard
      div.col-7
        div.m-imgContainer
            img(class="m-imgContainer_image" src="@/assets/img/friends.jpg")
      div.col-5
        div.m-intro
          h5.m-heading.m-heading--left 認識新朋友
          p.m-para 出社會後，覺得很難交到新朋友嗎，除了職場環境還想額外認識新朋友嗎? 讓我們來幫你，認識更多好朋友，在這裡找到你的知心好友、你的另一半
          b-button(pill variant="info" class="tx-white" ) 詳細資訊

</template>

<script>
import bg from '../assets/img/friends.jpg'

export default {
  name: 'index',    
  components: {
  },
  data(){
      return{
          bg:bg
      }
  }  
}
</script>

<style>
</style>
