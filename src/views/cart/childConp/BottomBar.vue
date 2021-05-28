<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" @click.native="checkBtnClick" :isChecked="isSelectAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="toPay">去结算({{addProduct}})</span>
  </div>
</template>

<script>
  import CheckButton from "@/components/common/checkButton/CheckButton";
	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
		  totalPrice() {
        const cartList = this.$store.state.cartList;
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
      },
      addProduct () {
        let count = 0
        if (this.$store.state.cartList.length > 0) {
          this.$store.state.cartList.map((item) => {
            count += item.count
          })
        } else {
          count = 0
        }
        return count
      },
      isSelectAll () {
        return this.$store.state.cartList.find(item => item.checked === false) === undefined;
      }
    },
    methods: {
      checkBtnClick () {
        // 1.判断是否有未选中的按钮
        let isSelectAll = this.$store.state.cartList.find(item => !item.checked);

        // 2.有未选中的内容, 则全部选中
        if (isSelectAll) {
          this.$store.state.cartList.forEach(item => {
            item.checked = true;
          });
        } else {
          this.$store.state.cartList.forEach(item => {
            item.checked = false;
          });
        }
      },
      toPay () {
        if (this.$store.state.cartList.find(item => item.checked) === undefined) {
          this.$toast.toastShow('请选择要购买的商品')
        }
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #f3f1f1;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -1px 0 rgba(222, 218, 218, 0.2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 14px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: var(--color-tint);
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
