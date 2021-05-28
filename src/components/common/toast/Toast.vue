<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data () {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    toastShow (message, duration = 1500) {
      this.message = message
      this.isShow = true
      setTimeout(() => {
        this.message = ''
        this.isShow = false
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast{
    position: fixed;
    background: #000;
    z-index: 999;
    left:0;
    top: 150px;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 80%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px;
    color: #ffffff;
    opacity: .8;
  }
</style>
