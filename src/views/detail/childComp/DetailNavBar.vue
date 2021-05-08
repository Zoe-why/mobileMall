<template>
  <nav-bar>
    <div slot="left" @click="imgClick">
      <img style="margin-top: 14px; width: 15px;" src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="detail-nav-center">
      <div v-for="(item, index) in titles" :class="{active: currentIndex === index}" class="detail-center-item" @click="itemClick(index)">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },
    imgClick () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .detail-nav-center {
    display: flex;
    font-size: 12px;
  }
  .detail-center-item {
    flex: 1;
  }
  .active {
    color: var(--color-tint);
    font-weight: bold;
  }
</style>
