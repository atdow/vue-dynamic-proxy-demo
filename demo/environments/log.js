const chalk = require('chalk')

class Log {
  constructor () {
    this.log = console.log
  }

  static getInstance () {
    if (!this.instance) {
      this.instance = new Log()
    }
    return this.instance
  }

  info () {
    this.log(...arguments)
  }

  success (message) {
    this.log(chalk.bold.green(message))
  }

  error (message) {
    this.log(chalk.bold.red(message))
  }

  warning (message) {
    this.log(chalk.hex('#FFA500')(message))
  }
}

module.exports = {
  logger: Log.getInstance()
}
