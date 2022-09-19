/*
 * @Author: atdow
 * @Date: 2022-09-13 21:08:37
 * @LastEditors: null
 * @LastEditTime: 2022-09-19 21:40:41
 * @Description: 本地动态代理配置
 */
const fs = require('fs')
const path = require('path')

const encoding = 'utf-8'
/**
 * 获取配置文件内容 getContent('proxy-config.json')
 * @param filename env.json
 * @returns {string}
 */
const getContent = filename => {
  const dir = path.resolve(process.cwd(), 'environments')
  return fs.readFileSync(path.resolve(dir, filename), { encoding })
}

const jsonParse = obj => {
  return Function('"use strict";return (' + obj + ')')()
}

/**
 * 获取配置选项 getConfig()
 * @returns {{}|*}
 */
const getConfig = () => {
  try {
    return jsonParse(getContent('proxy-config.json'))
  } catch (e) {
    return {}
  }
}

module.exports = {
  proxy: {
    ['/my-api']: {
      target: 'that must have a empty placeholder',
      changeOrigin: true,
      router: () => (getConfig() || {}).target || ''
    }
  }
}
