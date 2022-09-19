/*
 * @Author: atdow
 * @Date: 2020-04-15 16:07:12
 * @LastEditors: null
 * @LastEditTime: 2022-09-17 22:34:18
 * @Description: file description
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  }
]

const router = new VueRouter({
  routes
})

export default router
