<template>
    <div>
      <div class="icon-selector" :class="{'selector-active': isChecked}">
        <img src="~/assets/img/cart/tick.svg" alt="">
      </div>
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
		  isChecked: {
		    type: Boolean,
        default: false
      }
    },
    data () {
		  return {
		    checked: this.isChecked
      }
    },
    methods: {
      selectItem () {
        this.$emit('checkBtnClick')
      }
    }
	}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
    text-align: center;
  }
  .icon-selector img {
    width: 12px;
  }
  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
