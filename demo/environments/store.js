/*
 * @Author: atdow
 * @Date: 2022-09-13 21:08:37
 * @LastEditors: null
 * @LastEditTime: 2022-09-19 21:41:08
 * @Description: file description
 */
const fs = require('fs')

const encoding = 'utf-8'

class FileStore {
  filepath

  constructor(filepath) {
    this.filepath = filepath
  }

  checkExists() {
    return fs.existsSync(this.filepath)
  }

  /**
   * 如果文件不存在，就直接返回一个空对象过去。
   */
  get() {
    return new Promise(resolve => {
      fs.readFile(this.filepath, { encoding }, (err, data) => {
        if (err) return resolve(JSON.stringify({}))
        resolve(data)
      })
    })
  }

  set(content) {
    return fs.writeFileSync(this.filepath, content, { encoding })
  }
}

module.exports = {
  FileStore: FileStore
}
