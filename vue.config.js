module.exports = {
  devServer: {
    port: 8080,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://www.weinihaigou.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''   //重写接口
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'utils': '@/utils',
        'mixins': '@/mixins'
      }
    }
  }
  
}