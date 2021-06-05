import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastClick from 'fastclick'
import lazyLoad from 'vue-lazyload'
import toast from "@/components/common/toast";

Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()

/**
 * 解决移动端 300ms延迟问题
 */
fastClick.attach(document.body)
fastClick.prototype.focus = function (targetElement) {
  var length
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
  if (isiOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
    length = targetElement.value.length
    targetElement.focus()// 加入这一句话
    targetElement.setSelectionRange(length, length)
  } else {
    targetElement.focus()
  }
}

// 安装自己封装的插件
Vue.use(toast) // vue.use ==> 会默认执行install()函数，同时传入vue作为参数
// 安装lazy-load
Vue.use(lazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
