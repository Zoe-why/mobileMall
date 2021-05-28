module.exports = {
  configureWebpack: {
    resolve: {
      // 起别名
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'network': '@/network',
        'components': '@/components',
        'views': '@/views',
        // 'vue$': 'vue/dist/vue.esm.js'
      }
    }
  },
  //Solution For Issue:You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
  //zhengkai.blog.csdn.net
  runtimeCompiler: true
}
