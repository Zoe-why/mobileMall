// 混入mixin
import { debounce } from "@/common/utils";

export const itemMounted = {
  data () {
    return {
      itemImgLister: null,
      refresh: null
    }
  },
  mounted () {
    this.refresh = debounce(this.$refs.scroll.refresh)
    // 对监听的事件进行保存
    this.itemImgLister = () => {
      this.refresh()
    }
    // 监听图片加载完成,调用refresh函数
    this.$bus.$on('goodListItemLoad', this.itemImgLister)
  }
}
