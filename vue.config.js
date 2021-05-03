module.exports = {
  configureWebpack: {
    resolve: {
      // 起别名
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'network': '@/network',
        'components': '@/components',
        'views': '@/views'
      }
    }
  }
}
