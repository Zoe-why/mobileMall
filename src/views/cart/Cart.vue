<template>
  <div>
    <cart-nav-bar></cart-nav-bar>
    <cart-list></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import CartNavBar from "@/views/cart/childConp/CartNavBar";
import CartList from "@/views/cart/childConp/CartList";
import BottomBar from "@/views/cart/childConp/BottomBar";

export default {
  name: "Cart",
  components: {
    CartNavBar,
    CartList,
    BottomBar
  }
}
</script>

<style scoped>
  .cart-nav-bar{
    background: var(--color-tint);
  }
  .content{
    height: calc(100vh - 44px)
  }
</style>
