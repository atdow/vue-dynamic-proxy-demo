/*
 * @Author: atdow
 * @Date: 2020-04-15 16:07:14
 * @LastEditors: null
 * @LastEditTime: 2022-09-17 22:36:57
 * @Description: file description
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
