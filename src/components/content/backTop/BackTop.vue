<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: "BackTop"
}
</script>

<style scoped>
  .back-top{
    position: fixed;
    right: 15px;
    bottom: 100px;
    z-index: 999;
  }
  .back-top img {
    width: 43px;
  }
</style>
