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

// 加载注册vant组件模块
import './utils/register-vant.js'

// 加载全局样式
// 一定要把自己的样式引入到第三方组件样式下面
import './styles/index.less'
import 'amfe-flexible' // 配置rem 适配
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
