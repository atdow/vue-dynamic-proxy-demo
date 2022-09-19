#! /usr/bin/env node
const path = require('path')
const inquirer = require('inquirer')
const { program } = require('commander')
const { logger } = require('./log')
const { FileStore } = require('./store')

const jsonParse = obj => {
  return Function('"use strict";return (' + obj + ')')()
}

const firstUpperCase = ([first, ...rest]) => (first || '').toUpperCase() + rest.join('')

class EnvTool {
  constructor() {
    this.init()
  }

  init() {
    program.version('1.0.0')

    const padString = ' ' // 占位文本
    const dir = path.resolve(process.cwd(), 'environments')
    const list = new FileStore(path.resolve(dir, 'env.json'))
    const config = new FileStore(path.resolve(dir, 'proxy-config.json'))
    /**
     * 获取当前代理
     * @returns {Promise<*>}
     */
    const getCurrentProxy = async () => {
      return jsonParse(await config.get())
    }
    /**
     * 可用代理列表
     * @returns {Promise<{flag: boolean, values: [string, unknown][], proxies: *}>}
     */
    const getProxyList = async () => {
      const proxies = jsonParse(await list.get())
      const values = Object.entries(proxies)

      if (!(values || '').length) logger.error(`>>> 代理清单为空，请检查 environments/env.json 文件`)

      return { flag: (values || '').length > 0, values, proxies }
    }

    // 初始化proxy-config.json
    program.command('init')
      .option('-e, --env <value>', '指定环境变量', 'prod')
      .description('初始化')
      .action(async (argv) => {
        const { env } = argv
        if (!env) return logger.error('>>> 代理配置: 获取环境变量异常')

        const { flag, values } = await getProxyList()
        if (!flag) return

        const find = values.find(item => item[0] === env)
        if (!find) return logger.warning('>>> 代理配置: 代理配置无效')

        const action = find[1].GLOBAL_API_PROXY

        console.log('action:', action)
        console.log('find:', find)

        if (action) {
          config.set(JSON.stringify({ env: env, target: action }))

          logger.success(`>>> 初始化代理成功--> ${env}: ${action} `)
        }
      })

    program.command('list')
      .alias('ls')
      .description('列出所有代理')
      .action(async () => {
        const selected = await getCurrentProxy() || {}
        const resp = await getProxyList()

        const { flag, proxies } = resp
        if (!flag) return

        for (const key in proxies) {
          const { GLOBAL_API_PROXY } = proxies[key]
          const used = (selected.env === key && selected.target === GLOBAL_API_PROXY) ? '*' : padString
          const fmtTarget = `${key} `.padEnd(15, '-')
          logger.info(` ${used} ${fmtTarget} ${GLOBAL_API_PROXY}`)
        }
      })

    program
      .command('change')
      .alias('use')
      .description('切换代理')
      .action(async () => {
        const selected = await getCurrentProxy()
        const { flag, values } = await getProxyList()
        if (!flag) return

        const { action } = await inquirer.prompt([
          {
            name: 'action',
            type: 'rawlist',
            message: '请选择代理: ',
            default: (selected || {}).target,
            choices: values.map(item => {
              return { name: item[0], value: { env: item[0], target: item[1].GLOBAL_API_PROXY } }
            }).concat([
              { name: 'cancel', value: false }
            ])
          }
        ])

        if (action) {
          const { target, env } = action
          config.set(JSON.stringify({ env, target }))
          logger.success(`>>> 切换代理成功--> ${env}: ${target} `)
        }
      })

    program.parse()
  }
}

new EnvTool()
