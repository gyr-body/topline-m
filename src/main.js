import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 按需注册 Vant 组件
import {
  Button,
  Cell,
  CellGroup
} from 'vant'
import './utils/register-vant.js' // 加载执行注册模块
Vue
  .use(Button)
  .use(Cell)
  .use(CellGroup)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
