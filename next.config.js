const path = require('path')
const webpack = require('webpack')
const withCss = require('@zeit/next-css')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const baseConfig = require('./config')

const configs = {
  distDir: 'dist', // 编译文件的输出目录
  // generateEtags: true, // 是否给每个路由生成Etag
  // onDemandEntries: {
  //   // 页面内容缓存配置(内存)
  //   maxInactiveAge: 25 * 1000, // 内容在内存中缓存的时长（ms）
  //   pagesBufferLength: 2 // 同时缓存多少个页面
  // },
  // pageExtensions: ['jsx', 'js'], // 在pages目录下哪种后缀的文件会被认为是页面
  // generateBuildId: async () => {
  //   // 配置buildId
  //   if (process.env.YOUR_BUILD_ID) return process.env.YOUR_BUILD_ID
  //   return null // 返回null使用默认的unique id
  // },
  webpack(config, options) {
    // 忽略调moment的locale
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    return config
  },
  // webpackDevMiddleware: config => {
  //   // 修改webpackDevMiddleware配置
  //   return config
  // },
  env: {
    // 可以在页面上通过process.env.customKey 获取value
    customKey: 'value'
  },
  // serverRuntimeConfig: {
  //   // 下面两个要通过 'next/config' 来读取,只有在服务端渲染时才会获取的配置
  //   mySecret: 'secret',
  //   secondSecret: process.env.SECOND_SECRET
  // },
  publicRuntimeConfig: {
    // 在服务端渲染和客户端渲染都可以获取的配置
    GITHUB_OAUTH_URL: baseConfig.GITHUB_OAUTH_URL,
    OAUTH_URL: baseConfig.OAUTH_URL
  },
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  }
}

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}

module.exports = withBundleAnalyzer(withCss(configs))
