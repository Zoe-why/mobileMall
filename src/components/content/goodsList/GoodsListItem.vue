<template>
  <div class="goods-item" @click="toDetail">
    <img :src="showImg" class="goods-img" alt="" @load="imgLoad">
    <div class="goods-info">
      <p class="goods-title">{{goodsListData.title}}</p>
      <span class="price">¥{{goodsListData.price}} </span>
      <span class="collect">☆ {{goodsListData.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsListData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    showImg () {
      return this.goodsListData.image || this.goodsListData.show.img
    }
  },
  methods: {
    imgLoad () {
      // 事件总线监听图片加载完成
      this.$bus.$emit('goodListItemLoad')
    },
    toDetail () {
      this.$router.push('detail/' + this.goodsListData.iid)
    }
  }
}
</script>

<style scoped>
  .goods-item {
    width: 45%;
    padding-bottom: 20px;
  }
  .goods-item .goods-img{
    width: 100%;
    border-radius: 5px;
    border: 2px solid var(--color-tint);
  }
  .goods-info {
    text-align: center;
    font-weight: bold;
  }
  .goods-info .goods-title{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    margin-bottom: 5px;
  }
  .goods-info .price {
    color: var(--color-tint);
    font-size: var(--font-size);
  }
  .goods-info .collect {
    font-size: var(--font-size);
  }
</style>
