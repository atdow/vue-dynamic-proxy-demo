/*
 * @Author: atdow
 * @Date: 2022-09-17 23:31:49
 * @LastEditors: null
 * @LastEditTime: 2022-09-17 23:34:53
 * @Description: file description
 */
import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
    baseURL: "/api", // "/api"

    timeout: 300000 // 请求超时时间12s
})

const err = error => {
    return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {

    return config
}, err)

// response interceptor
service.interceptors.response.use(response => {
    return response.data
}, err)


export default service
