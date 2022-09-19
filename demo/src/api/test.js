/*
 * @Author: atdow
 * @Date: 2022-09-17 23:35:06
 * @LastEditors: null
 * @LastEditTime: 2022-09-18 00:40:47
 * @Description: file description
 */
import request from './request'

export function apiTest(parameter) {
    return request({
        url: '/my-api',
        method: 'get',
    })
}
