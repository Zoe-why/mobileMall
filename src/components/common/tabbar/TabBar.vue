<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
name: "TabBar"
}
</script>

<style scoped>
@import "../../../assets/css/base.css";
#tabbar{
  display: flex;
  background: #f6f6f6;
  /*配合定位
  这俩属性可以保证占据整个屏幕
  left: 0;
  right: 0;
  */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  box-shadow: 0 -1px 0 rgba(100, 100 , 100, .3);
}

</style>
