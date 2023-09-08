const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  parallel: false,
  outputDir: './dist',
  publicPath: process.env.NODE_ENV = '/',
  assetsDir: 'static',
  filenameHashing: true,
  productionSourceMap: false,
  chainWebpack: config => {
    config.output.filename('[name].[hash].js').end()
    config.output.chunkFilename('[name].[hash].js').end()
  }
  }
})
