<template>
  <div class="tabbar-item" @click="itemClick">
<!-- 插槽外包一层div，可以避免替换插槽的时候，样式等属性被替换的问题 -->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else >
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'pink'
    }
  },
  data () {
    return {

    }
  },
  computed: {
    isActive () {
      //this.$route==>当前处于活跃状态的路由对象
      // 如果当前处于活跃状态的路径跟点击传过来的路径一样，那就为true
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle () {
      // 如果活跃，那就指定颜色
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick () {
      this.$router.replace(this.path)
     }
  }
}
</script>

<style scoped>
.tabbar-item{
  /*
  flex: 1==>对Item进行均等分
  */
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tabbar-item img{
  width: 24px;
  margin: 3px 0 2px;
  /*去掉图片下面默认的三个像素*/
  vertical-align: middle;
}
.active{
  color: #ff0000;
}
</style>
