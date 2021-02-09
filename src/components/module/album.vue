<template lang="pug">
  div.m-mainImg
    div.m-mainImg_container
      img(:src="MainImg")
      div.m-mainImg_container_name(v-if="disabled")
        p {{ name + ' ' + age + "歲" }}
    div.m-otherImg_container
      div.m-otherImg_imgBox(v-for="(item,index) in photo" v-if="photo.length" :class="{isActive:index == active}" :key="index" @click.stop="activeImage(item,index)" )
        //- img(src="@/assets/img/avatar1.png")
        img(:src="item" )
        div.editRadius(v-if="!disabled" @click.stop="cardModal(index)")
          font-awesome-icon( class="edit" :icon="['fas', 'pen']")
      div.m-otherImg_imgBox.add(v-if="photo.length < 4 && !disabled" @click.stop="cardModal(-1)")
        font-awesome-icon(class="imageIcon" :icon="['fas', 'plus']")
</template>

<script>
import imageUpload from "@/components/module/imageUpload.vue";

export default {
  name: 'album',
  // inject: ['reload'],
  components: {
    imageUpload
  },    
  props:{
    photo:{
      type:Array,
      default() {
          return []
      }
    },
    disabled:{ //點選其他人的資料不能編輯
      type:Boolean,
      default:false
    },
    name:{
      type:String,
      default:''
    },
    age:{
      type:String,
      default:''
    }
  },
  data () {
    return {          
      album:this.photo,
      // album:['static/avatar1.png','static/avatar2.png','static/friends.jpg'], //測試用
      activeImg:"static/avatarNo.png",
      NoImg:"static/avatarNo.png",
      active:-1
    }
  },
  computed:{
    MainImg(){ //選擇哪個相片
      if(this.photo.length == 0 ) //沒相片
       return this.NoImg;
      else{ //有相片
        if(this.active == -1){
          this.active = 0;
          return this.photo[0];
        }
        else{
          return this.activeImg;
        }
          
      }
        
    }
  },
  methods: {
    cardModal(index){
      this.$modal.show( imageUpload, 
        { 
          text: 'This text is passed as a property',
          photo:this.photo,
          index:index
         },
        {
          clickToClose: false,
          width:'900px',
          height:'510px'
        },
        {
          'before-close':event => {
            if(event.params == 'update'){
              this.refresh();
            }
          }
        }

      );
    },
    activeImage(item,index){ //選擇哪個相片
      this.activeImg = item;
      this.active = index;
    },
    refresh(){ //選染組件(page)
      //  this.reload(); 
      this.$store.state.isLoading = false;
      location.reload();
    }    
  }    
}
</script>

<style >

</style>
