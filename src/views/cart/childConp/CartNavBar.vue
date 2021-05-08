<template>
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{allCart}})</div>
  </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "CartNavBar",
  components: {
    NavBar
  },
  computed: {
    allCart () {
      /**
       *
       * @type {number}
       * 获取商品的数量
       * let count = 0
       if (this.$store.state.cartList.length > 0) {
        this.$store.state.cartList.map((item) => {
          count += item.count
        })
      } else {
        count = 0
      }
       return count
       */
      return this.$store.getters.cartListLength


    }
  }
}
</script>

<style scoped>
  .nav-bar{
    background: var(--color-tint);
    color: #fff;
    font-weight: bold;
  }
</style>
