<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper'
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    banners: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      isLoad: false
    }
  },
  methods: {
    imgLoad () {
      // 加个判断，只发送一次
      if (!this.isLoad) {
        this.$emit('imgLoadAll')
          this.isLoad= true
      }
    }
  }
}
</script>

<style scoped>

</style>
