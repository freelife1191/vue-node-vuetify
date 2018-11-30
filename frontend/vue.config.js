module.exports = {
  outputDir: '../backend/public',

  devServer: {
    proxy: { // proxyTable 설정
      '/pickup_inter/api': {
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  baseUrl: undefined,
  assetsDir: undefined,
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined
}