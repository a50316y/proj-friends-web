// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay' //component
import 'vue-loading-overlay/dist/vue-loading.css' //style
import VueCropper from 'vue-cropper'
import {ValidationProvider,ValidationObserver,extend,localize } from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import * as rules from "vee-validate/dist/rules";
import { messages } from 'vee-validate/dist/locale/en.json';
import md5 from 'js-md5';
import './assets/css/App.scss'
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import VModal from 'vue-js-modal'
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: {
    autoConnect: false,
    foceNew: true,
    reconnectionAttempts: "Infinity",
    transports: ["polling"],
    timeout: 10000,
  } //Optional options
}))

Vue.directive('focus', {
  inserted: function (el) {
    el.focus();
  }
})

// 若點集元素外部,觸發事件
Vue.directive('clickOutside', {
  bind(el, binding, vNode) {
    // 提供的表達式必須是方法
    if (typeof binding.value !== 'function') {
      const compName = vNode.context.name
      let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
      if (compName) {
        warn += `Found in component '${compName}'`
      }
    }
    // 定義程序並緩存在元素上
    const bubble = binding.modifiers.bubble
    const handler = (e) => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e)
      }
    }
    el.__vueClickOutside__ = handler

    // 加入監聽
    document.addEventListener('click', handler)
  },

  unbind(el, binding) {
    // 移除監聽
    document.removeEventListener('click', el.__vueClickOutside__)
    el.__vueClickOutside__ = null
  }
});



Vue.prototype.$md5 = md5;

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule] // assign message
  });
});

localize("zhTW", zhTW);

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueCropper)
Vue.use(VModal)

library.add(fab,fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('ValidationProvider', ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component('Loading', Loading)
dom.watch() // This will kick of the initial replacement of i to svg tags and configure a MutationObserver


Vue.config.productionTip = false


router.beforeEach((to, from, next) => { // router跳轉的頁面需要驗證 requiresAuth:true
  console.log('to=', to.fullPath, '| from=', from.fullPath);
  if (to.matched.some(record => {
    console.log(record.name, record.meta.requiresAuth);
    return record.meta.requiresAuth;
  })) {
    console.log('token?', store.state.userToken);
    if (store.state.userToken === '') {
      alert('尚未登入!!! 請您先登入會員');
      setTimeout(() => {
        router.push({ path: '/login' });
      }, 500)           
    }
    else {
      next(); //往下繼續進行
    }
  }
  else {
    next();//往下繼續進行
  }
});


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
