<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
         class="tab-control-item"
         :class="index === defaultIndex ? 'active' : ''"
         @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: Array,
    default () {
      return []
    }
  },
  data () {
    return {
      defaultIndex: 0
    }
  },
  methods: {
    tabClick (index) {
      this.defaultIndex = index
      this.$emit('tabControlClick', index)
    }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
  justify-content: space-between;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background: #fff;
}
.tab-control-item{
  flex: 1;
}
  .active {
    color: var(--color-tint);
  }
.active span {
  padding: 3px 0;
  border-bottom: 3px solid var(--color-tint);
}
</style>
