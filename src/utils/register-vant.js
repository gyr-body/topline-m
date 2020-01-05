// 封装注册
// 将Vant组件单独封装在本模块中
// 所有 Vant 组件的注册就都写到上面的模块中
import Vue from 'vue'

import { Button, Cell, CellGroup } from 'vant'

Vue.use(Button)
  .use(Cell)
  .use(CellGroup)
