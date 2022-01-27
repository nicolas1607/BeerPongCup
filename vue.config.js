module.exports = {
  outputDir: '../bpc_cordova/www',

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    }
  },

  configureWebpack: {
    devServer: {
      historyApiFallback: true
    }
  },
}