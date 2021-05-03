<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommend="recommend"></recommend-view>
    <feature-view></feature-view>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "@/views/home/childComp/HomeSwiper";
import RecommendView from "@/views/home/childComp/RecommemdView";
import FeatureView from '@/views/home/childComp/FeatureView'
import {getHomeMultidata} from "@/network/home";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data () {
    return {
      banners: [],
      recommend: []
    }
  },
  created() {
  //  发送请求
    getHomeMultidata().then(res => {
      console.log(res, 'res');
      this.banners = res.data.banner.list
      this.recommend = res.data.recommend.list
    })
  }
}
</script>

<style scoped>
  #home{
    padding-top: 44px;
  }
  .home-nav{
    background: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 999;
  }
</style>
