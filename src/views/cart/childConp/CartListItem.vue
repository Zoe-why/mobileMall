<template>
  <div id="shop-item">
    <div class="item-selector">
      <CheckButton @click.native="checkedChange" :isChecked="itemInfo.checked"></CheckButton>
      <div>{{itemInfo}}</div>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">商品描述: {{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/common/checkButton/CheckButton";

export default {
  name: "ShopCartItem",
  props: {
    itemInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    CheckButton
  },
  methods: {
    checkedChange () {
      this.itemInfo.checked = !this.itemInfo.checked;
    }
  }
}
</script>

<style scoped>
#shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 2px solid #eeeeee;
}

.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title, .item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: var(--font-size);
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 12px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info-bottom .item-price {
  color: var(--color-tint)
}

.item-count {
  font-size: 10px;
}
</style>
