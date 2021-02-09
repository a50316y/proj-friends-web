<template lang="pug">
  div.m-chat_inbox( :class="showChatBox" ref="chatBox" @click="clickChat()" v-clickOutside="msgUnFocus")
    header.m-chat_inbox_header(:class="isMsgNew")
      div.m-chat_inbox_header__avatar
        img(:src="chatAvatar")
        p.title(:class="isMsgNew") {{ chatName }}
      a( href="#" class="header-close" :class="isMsgNew" @click="CloseChatBox()") 
        font-awesome-icon( :icon="['fas', 'times']" )
    div(class="m-chat_inbox-body" ref="chat")
      div.flex-d
        div.msg(v-for="(item,index) in msgList" :key="index")
          div.msg_avatar(v-if="showAvatar(index)")
            img(:src="chatAvatar")
          p(:class="whoseMsg(item,index)" :id="'time-' + index") {{ item.msg }}
          b-tooltip(:target="'time-'+ index" triggers="hover" placement="left" variant="primary") {{transferTime(item.base.createTime)}}
          div.msg_read
            img(v-if="showRead(item,index) == '1'" :src="chatAvatar")
            font-awesome-icon(v-if="showRead(item,index) == '2'" class="unread" :icon="['fas', 'check-circle']" )               
    div.m-chat_inbox-bottom
      b-form-textarea( id="textarea" size="sm" v-model="msg" placeholder="Aa" rows="4"
        no-resize   @keydown="sendMsg($event)" ref="chatBoxMsg")   
    
</template>

<script>
import moment from "moment";
export default {
  name: 'chatBox',
  components: {
  },    
  sockets: {
      connect: function () {
          console.log('socket connected from page')
      },   
      // second(second){
      //   // console.log(second.second)
      // },
      pmsg(data){ //監聽私聊訊息
        if( data.fromId ==  this.$store.state.userId) //傳訊息成功 
          this.msg = '';  //訊息欄位清空
        else //對方傳來新訊息
          this.isNewMsg = true;     
        this.msgList.unshift(data);  //插入到array第一個位置
        this.ToEnd(); //將滾輪拉到最新訊息處
      },
      oppRead(data){ //對方已讀
        let quantity = data.nModified; //需要更改的已讀數量
        for(let i = 0; i < quantity; i++){
          this.msgList[i].read = true;
        }
      }
  },  
  props:{
    chatId:{
        type:String
    },
    chatName:{
        type:String,
        default:"none"
    },
    chatAvatar:{
      type:String,
      default:""
    },
    isChatBoxToggled:{
        type:Boolean,
        default:false
    }
  },
  data () {
    return { 
      isChatFocus:true, 
      msg:"",
      msgList:[],
      isNewMsg:false
    }
  },
  watch:{
    isChatBoxToggled(val){ //開啟訊息窗才呼叫訊息api
      if(val){ 
        this.$socket.emit('join', this.$store.state.userId);   
        this.GetMsg(); 
      }
    },
    chatId(val){
      this.GetMsg(); 
    }
  },
  computed:{ 
    showChatBox() { // 是否開啟聊天室
      return {
        "is-show": this.isChatBoxToggled,
        'is-focus':this.isChatFocus
      }
    },
    isMsgNew(){ //是否有最新訊息
      return{
        "newMsg":this.isNewMsg,
        "text-light":this.isNewMsg
      }
    }   
  },  
  methods: {
    msgUnFocus(){ //clickOutside觸發
      this.isChatFocus = false;
    },
    clickChat(){
      this.isChatFocus = true;
      this.isNewMsg = false;
      let from = this.chatId; //對方傳給我的訊息都已讀了
      let to = this.$store.state.userId;       
      console.log("from: " + from, "\n to: "+ to)  
      this.$socket.emit("read",from,to);
    },
    CloseChatBox(){ //關閉聊天室
      this.$socket.emit('leave', this.$store.state.userId);
      this.$emit("closeChat", 'success');
    },
    showRead(item,index){ //顯示已讀頭像
      // 1:顯示頭像 2:顯示未讀勾勾 3:不顯示任何東西
      if(index == 0){ //最新的訊息
        if(item.fromId == this.$store.state.userId){ //最新的訊息是自己傳的
          if(item.read)
            return '1'
          else
            return '2'          
        }
        else{//最新的訊息是對方傳的
          return '1'
        }

      }
      else{ //第二則訊息開始
        if(item.fromId == this.$store.state.userId){ //訊息是自己傳的
          if(this.msgList[index-1].fromId == this.$store.state.userId){//前一則訊息也是自己傳的
            if(item.read && this.msgList[index-1].read)
              return '3'
            else if(item.read && !this.msgList[index-1].read)
              return '1'
            else
              return '2'
          }
          else
            return '3' 
        }    
        else{//訊息是對方傳的
          return '3'
        }    
      }
    },
    transferTime(item){ //轉換訊息時間
      let date = moment(item).format("YYYY/MM/DD");
      let now = moment(new Date()).format("YYYY/MM/DD");
      if( date == now ){
        date = moment(item).format("HH:mm");
        return '今天 ' + date;        
      }
      else{
        date = moment(item).format("YYYY年MM月DD日 HH:mm");
        return date; 
      }
    },
    sendMsg(event){ //送出訊息
      let from = this.$store.state.userId;
      let to = this.chatId;      
      if (event.keyCode === 13) {//enter
          this.$socket.emit("private_message",from,to,this.msg);
          event.preventDefault() // 阻止浏览器默认换行操作
      }      
    },
    whoseMsg(item,index){ //判斷訊息 加上class
      if(item.fromId == this.$store.state.userId)
        return 'My';
      else
        return 'You';
    },
    showAvatar(index){ //顯示頭像
      if( this.msgList[index].fromId == this.$store.state.userId)
        return false;
      else{
        if(index == 0) //訊息在最底部了
          return true;
        else{
          if(this.msgList[index].fromId != this.msgList[index-1].fromId)
            return true;
          else
            return false          
        }
      }
    },
    GetMsg(){
      const config = {
        headers:{ //Customer header 
          'content-Type':'application/json',
          'Authorization': this.$store.state.userToken
        }
      }

      try { //取得user資料
        let dataForm = {
          from:this.$store.state.userId,
          to:this.chatId,      
        };

        const post = this.axios.post('/data/chat/getMsg', dataForm,config)
        .then((res) => { 
          if(res.data.code == 1){
            let data = res.data.data;
            this.msgList = data;
            this.ToEnd();                        
          }
          else{ 
            console.log(res.data.msg);             
          }
          })
        .catch((err) => { console.log(err) })
      } catch (err) {
        throw new Error(err);
        console.log(err);              
      }       
    },
    ToEnd(){ //開啟聊天時或送出訊息時滾動到最下方
      this.$nextTick(() => {
        let chat = this.$refs.chat;
        chat.scrollTop = chat.scrollHeight;
      })
    }    
  },
  mounted() {
    this.$socket.connect();
  } 
}
</script>

<style >

</style>
