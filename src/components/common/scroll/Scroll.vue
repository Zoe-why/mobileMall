<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default () {
        return 0
      }
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false
      }
    },
    scrollType: {
      type: String
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 创建better-scroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        mouseWheel: true, // 开启鼠标滚轮
        disableMouse: false, // 启用鼠标拖动
        disableTouch: false, // 启用手指触摸
        pullUpLoad: this.pullUpLoad // 上拉加载
      })
      // 监听滚动区域
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', position => {
          if (this.scrollType && this.scrollType === 'detail') {
            this.$emit('scrollDetailPosition', position)
          } else if (this.scrollType && this.scrollType === 'home') {
            this.$emit('scrollPosition', position)
          }
        })
      }
      // 监听上拉加载
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUpMore')
        })
      }

    })
  }
}
</script>

<style scoped>
  .wrapper {
    height: calc(100vh - 93px);
    position: relative;
    overflow: hidden;
  }
</style>
