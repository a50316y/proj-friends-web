// 自創 directive 請放這唷

// input 聚焦
import Vue from 'vue'
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
