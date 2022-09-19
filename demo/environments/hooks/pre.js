/*
 * @Author: atdow
 * @Date: 2022-09-13 21:08:37
 * @LastEditors: null
 * @LastEditTime: 2022-09-19 21:52:27
 * @Description: file description
 */
const path = require('path')
const { FileStore } = require('../store')
const { logger } = require('../log')
const { run } = require('runjs')

const TARGET = process.env.npm_lifecycle_event

if (TARGET === 'predev') {
  const dir = path.resolve(process.cwd(), 'environments')
  const list = new FileStore(path.resolve(dir, 'env.json'))
  const config = new FileStore(path.resolve(dir, 'proxy-config.json'))

  if (list.checkExists()) {
    if (!config.checkExists()) {
      logger.warning('> [预执行钩子]: 代理初始化配置开始')
      run('node environments/cli.js init')
      logger.warning('> [预执行钩子]: 代理初始化配置完成')
    }
  } else {
    logger.error(`> 代理配置错误，可能导致运行异常，请检查 environments 相关配置`)
  }
}
