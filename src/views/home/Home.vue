<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control ref="tabControl_1" :titles="titles" @tabControlClick="tabControlClick" v-show="isTabFix"></tab-control>
    <scroll class="wrapper"
            ref="scroll"
            :probeType="3"
            :pullUpLoad="true"
            :scrollType="scrollType"
            @pullingUpMore="pullingUpMore"
            @scrollPosition="scrollPosition">
      <home-swiper :banners="banners" @imgLoadAll="imgLoadAll"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control ref="tabControl" :titles="titles" @tabControlClick="tabControlClick"></tab-control>
      <goods-list :GoodsListData="GoodsListData"></goods-list>
    </scroll>

<!--.native监听组件原生的点击-->
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/common/tabControl/TabControl";
import Scroll from "@/components/common/scroll/Scroll";

import GoodsList from "@/components/content/goodsList/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";

import HomeSwiper from "@/views/home/childComp/HomeSwiper";
import RecommendView from "@/views/home/childComp/RecommemdView";
import FeatureView from '@/views/home/childComp/FeatureView'

import { getHomeMultiData, getHomeGoods } from "@/network/home";
import { itemMounted } from "@/common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  mixins: [itemMounted],
  data () {
    return {
      banners: [],
      recommend: [],
      titles: ['流行', '新款', '精选'],
      goods: {
        pop: {page: 0, list: []},
        new: {page: 0, list: []},
        sell: {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFix: false,
      saveY: 0,
      scrollType: 'home'
    }
  },
  computed:{
    GoodsListData () {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     *事件监听相关
    **/
    tabControlClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
        default:
      //    no default
      }
      // 吸顶之后，导航栏保持一致
      this.$refs.tabControl_1.defaultIndex = index
      this.$refs.tabControl.defaultIndex = index
    },
    backTop () {
      this.$refs.scroll.scroll.scrollTo(0, 0)
    },
    scrollPosition (position) {
      // 回到顶部是否显示
      this.isShowBackTop = (-position.y) > 1000
      // tabControl是否吸顶
      this.isTabFix = position.y < -this.tabOffsetTop
    },
    pullingUpMore () {
      // 上拉请求数据
      this.getHomeGoods(this.currentType)
    },
    imgLoadAll () {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    },
    /**
     * 网络请求相关
     */
    // 首页数据
    getHomeMultiData () {
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
  //  首页商品数据
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,  page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // 完成下拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  },
  created() {
    this.getHomeMultiData()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {

  },
  // 进来
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    // 滚动完刷新一次
    this.$refs.scroll.refresh()
  },
  // 离开
  deactivated() {
    // 拿到离开时的y
    this.saveY = this.$refs.scroll.scroll.y
    // 取消全局事件的监听，这样，就不需要首页监听详情页图片加载的完成了
    this.$off('goodListItemLoad', this.itemImgLister)
  }
}
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
  }
  .home-nav{
    background: var(--color-tint);
    color: #fff;
  }
  /*css 实现吸顶*/
  /*.tab-control {*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  z-index: 9;*/
  /*}*/

</style>
