// 封装axios 请求模块
import axios from 'axios'
import jsonBig from 'json-bigint'
// 在非组件模块中直接加载获取容器
// 这里拿到的 store 和你在组件中访问 this.$store 是一个东西
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // config 请求配置对象，我们可以通过修改 config 来实现统一请求数据处理
  const { user } = store.state

  // 统一添加 token
  if (user) {
    // config.headers 获取操作请求头对象
    // Authorization 是后端要求的字段名称
    // 数据值后端要求提供：Bearer token数据
    //    注意：Bearer 后面有个空格
    // 老师，为啥？后端要求的
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})
// axios 开放了自定义转换后返回数据的API
// 处理后端返回数据超出js安全返回问题
request.defaults.transformResponse = [function (data) {
  try {
    // 这个方法类似于JSON.parse  之不顾它能把数据中的超出js安全正数范围的数字给数里称正确的
    // 如果韩慧成功则返回成功的结果给请求使用
    // 如果转换失败则进入catch  返回一个空对象
    return jsonBig.parse(data)
  } catch (err) {
    console.log('转换失败', err)

    return {}
  }
}]
export default request
