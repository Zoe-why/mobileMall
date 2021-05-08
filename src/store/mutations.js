export default {
  addCount (state, payload) {
    payload.count++
  },
  addCart (state, payload) {
    // 添加到购物车的商品，默认选中
    payload.checked = true
    state.cartList.push(payload)
  }
}
