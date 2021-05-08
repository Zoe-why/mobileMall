<template>
  <div class="goods-list">
    <goods-list-item v-for="item in GoodsListData" :goodsListData="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goodsList/GoodsListItem";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    GoodsListData: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: var(--color-background);
    padding: 2px;
  }
</style>
