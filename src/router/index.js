import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 配置路由表
const routes = [
  { // 登录
    name: 'login',
    path: '/login',
    component: () => import('@/views/login') // 路由懒加载
  },
  {
    path: '/',
    name: 'tab-bar',
    component: () => import('@/views/tabbar'),
    children: [
      {
        // 首页
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        // 问答
        path: 'qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        // 视频
        path: 'video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        // 我的
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import('@/views/user')
  }
]

const router = new VueRouter({
  routes
})

export default router
