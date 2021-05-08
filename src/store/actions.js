export default {
  // 判断逻辑放到action中
  addCart (context, payload) {
    // 如果当前加入购物车之前添加过，return回来
    let product = context.state.cartList.find(item => {
      return item.iid === payload.iid
    })
    // 如果已经添加过
    if (product) {
      context.commit('addCount', product)
    } else { // 如果没添加
      // 就给新添加的商品加一个count属性，赋值为1
      payload.count = 1
      // 把新添加的商品加入到状态管理
      context.commit('addCart', payload)
    }
  }
}
