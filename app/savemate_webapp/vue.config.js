const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],

  chainWebpack: config => {
    // Ignore all `.d.ts` files
    config.module
      .rule('ignore-dts')
      .test(/\.d\.ts$/)
      .use('ignore-loader')
      .loader('ignore-loader')
      .end();
  }
});