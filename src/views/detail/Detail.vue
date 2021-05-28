<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav"></detail-nav-bar>

    <scroll class="content"
            ref="scroll"
            :probeType="3"
            :scrollType="scrollType"
            @scrollDetailPosition="scrollDetailPosition">
      <detail-swiper ref="base" :topImages="topImages"></detail-swiper>
      <detail-base-info  :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :GoodsListData="recommends"></goods-list>
    </scroll>

    <!--.native监听组件原生的点击-->
    <back-top @click.native="backTop" class="back-top" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>


  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComp/DetailNavBar";
import DetailSwiper from "@/views/detail/childComp/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComp/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComp/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComp/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComp/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComp/DetailCommentInfo";
import GoodsList from "@/components/content/goodsList/GoodsList";
import DetailBottomBar from "@/views/detail/childComp/DetailBottomBar";

import BackTop from "@/components/content/backTop/BackTop";

import Scroll from "@/components/common/scroll/Scroll";

import {getDetailData, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
import { debounce } from "@/common/utils";
import { itemMounted } from "@/common/mixin";


export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop
  },
  mixins: [itemMounted],
  data () {
    return {

      message: 'aaa',

      iid: null,
      topImages: [], // 顶部轮播
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      titleOffYs: [],
      getTitleTopY: null,
      scrollType: 'detail',
      currentIndex: 0,
      isShowBackTop: false
    }
  },
  methods: {
    titleClick (index) {
      this.$refs.scroll.scrollTo(0, -this.titleOffYs[index] + 22, 1500)
    },
    // 监听滚动事件
    scrollDetailPosition (position) {
      // 滚动跟标题联动
      const positionY = -position.y
      for (let i = 0; i < this.titleOffYs.length - 1; i++) {
        if (this.currentIndex !== i && (positionY >= this.titleOffYs[i] && positionY < this.titleOffYs[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 回到顶部是否显示
      this.isShowBackTop = (-position.y) > 1000
      // tabControl是否吸顶
      this.isTabFix = position.y < -this.tabOffsetTop
    },
    // 加入购物车
    addToCart () {
      // 获取购物车需要展示的信息
      const cartInfo = {
        image: this.topImages[0],
        title: this.goods.title,
        desc: this.goods.desc,
        price: this.goods.realPrice,
        iid: this.iid
      }
      this.$store.dispatch('addCart', cartInfo).then(res => {
        this.$toast.toastShow(res)
      })

    },
    // native监听组件原生的点击
    backTop () {
      this.$refs.scroll.scroll.scrollTo(0, 0)
    },
    getDetailData (iid) {
      getDetailData(iid).then(res => {
        this.topImages = res.result.itemInfo.topImages
        // 构造函数--获取商品信息
        this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
        //构造函数--获取店铺信息
        this.shop = new Shop(res.result.shopInfo)
        // 商品详情数据
        this.detailInfo = res.result.detailInfo
        // 获取参数的信息
        this.paramInfo = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)
        // 获取评论信息
          // 判断，有评论信息才取
        if (res.result.rate.cRate !== 0) {
          this.commentInfo = res.result.rate.list[0]
        }
      })
    },
    imageLoad() {
      // 图片加载完成回调--结合混入
      this.refresh()
      // 图片加载完成之后再请求positionY
      this.getTitleTopY()
    },
    getRecommend () {
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    }
  },
  created() {
    this.iid = this.$route.params.iid
    this.getDetailData(this.iid)
    this.getRecommend()
    this.getTitleTopY = debounce(() => {
      this.titleOffYs = []
      this.titleOffYs.push(this.$refs.base.$el.offsetTop)
      this.titleOffYs.push(this.$refs.param.$el.offsetTop)
      this.titleOffYs.push(this.$refs.comment.$el.offsetTop)
      this.titleOffYs.push(this.$refs.recommend.$el.offsetTop)
      this.titleOffYs.push(Number.MAX_VALUE)
    })
  },
  mounted() {
  },
  destroyed() {
    // 取消全局事件的监听，这样，就不需要首页监听详情页图片加载的完成了
    this.$off('goodListItemLoad', this.itemImgLister)
  }
}
</script>

<style scoped>
  .detail{
    position: relative;
    z-index: 999;
    background: #fff;
    height: 100vh;
  }
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  }
</style>
