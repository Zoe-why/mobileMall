import Toast from "@/components/common/toast/Toast";
// 封装toast
const obj = {}
obj.install = function (Vue) {
  //1、创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  //2、用new的方式，创造组件对象
  const toast = new toastContrustor()
  //3、将组件构造器手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  //4、放到body下  toast.$el对应的就是刚刚挂载的div
  document.body.appendChild(toast.$el)
  //5、放到vue的原型链中
  Vue.prototype.$toast = toast
}
export default obj
