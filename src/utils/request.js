import axios from 'axios'
import baseUrl from '@/api/baseUrl'

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000 * 1800
})

// 请求拦截器
// instance.interceptors.request.use(
//   (config) => {
//     // 携带token
//     // const userStore = useUserStore()
//     // if (userStore.token) {
//     //   config.headers.Authorization = userStore.token
//     // }
//     return config
//   },
//   (err) => Promise.reject(err)
// )

// 响应拦截器
// instance.interceptors.response.use(
//   (res) => {
//     // if (res.data.code === 0) {
//     //   return res
//     // }
//     // 处理业务失败
//     // alert(res.data.message || '服务异常')
//     // return Promise.reject(res.data)
//     return res
//   },
//   (err) => {
//     // 处理401错误
//     // 特殊情况 401 权限不足 或 token过期 => 拦截到登录
//     if (err.response?.status === 401) {
//       // router.push('/login')
//     }
//     // 默认情况
//     alert(err.response.data.message || '服务异常')
//     return Promise.reject(err)
//   }
// )

export default instance
