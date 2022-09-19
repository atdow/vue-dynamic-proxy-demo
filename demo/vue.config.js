/*
 * @Author: atdow
 * @Date: 2022-09-16 16:07:14
 * @LastEditors: null
 * @LastEditTime: 2022-09-17 00:22:21
 * @Description: file description
 */
const dynamicProxy = require('./environments/proxy.js')
const port = process.env.port || process.env.npm_config_port || 80 // 端口

module.exports = {
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
    port,
    open: false,
    proxy: dynamicProxy.proxy,
    disableHostCheck: true
  },
}
