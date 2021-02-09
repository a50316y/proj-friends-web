
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

// 定義一個新的 Vue Store
const store = new Vuex.Store({
    state: {
        isLoading: false,
        isNotificationToggled: false,
        isLogin:false,
        userToken:"",
        userId:"",
        userName:"尚未登入",
        avatar:""
    },
    mutations: {
        // 將state設定為參數
        Loaded(state) {
            // state的isLoading true/false 互轉
            state.isLoading = !state.isLoading
        },
        toggleNotification(state, payload) { // 側邊導覽列
            state.isNotificationToggled = payload.status
        },  
        setAuth(state,payload){ //登入
           state.userToken = payload.userToken;
           state.isLogin = payload.isLogin; //isLogin:true
           state.userId = payload.userId;
           state.userName = payload.userName;
           if (payload.avatar) //登入如果已經有大頭貼才會傳
            state.avatar = payload.avatar; 
        },
        clearAuth(state) { //登出
            state.userToken = '';
            state.isLogin = false;
            state.userId = '';
            state.userName = '尚未登入'
            state.avatar = '';
        },         
        swapAvatar(state, payload){ //更換大頭貼
          if(state.avatar != payload.avatar)
            state.avatar = payload.avatar;
        }   
    },
    plugins: [createPersistedState()],

})
export default store;