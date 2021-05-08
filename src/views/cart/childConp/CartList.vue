<template>
  <div>
    <scroll class="content">
      <cart-list-item v-for="(item, index) in allCart" :key="index" :itemInfo="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from "@/views/cart/childConp/CartListItem";
import Scroll from "@/components/common/scroll/Scroll";
export default {
  name: "CartList",
  components:{
    CartListItem,
    Scroll
  },
  computed: {
    allCart () {
      return this.$store.state.cartList
    }
  }
}
</script>

<style scoped>

</style>
