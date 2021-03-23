import axios from 'axios'
import { Toast } from 'vant'
// const errorMsg = {
//   title: '提示', // 加上标题
//   message: '登录过期,请重新登录!', // 改变弹出框的内容
//   closeOnPopstate: true,
//   beforeClose(action, done) {
//     window.location.hash = '#/login'
//     done()
//   }
// }
const service = axios.create({
  baseURL: '', // url = base url + request url https://zuul.carcredit.com.cn
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 2000 // request timeout
})

// 拦截请求
service.interceptors.request.use(
  config => {
    if (sessionStorage.getItem('tokenid')) {
      config.headers['username'] = sessionStorage.getItem('username')
      // config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('tokenid')
    }

    // console.log('request', config)
    return config
  },

  err => {
    return Promise.reject(err)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    // console.log("appConfig", response);
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    // console.log("appConfig", error.response);
    if (!error.response) {
      return
    }
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          // router.replace({
          //   path: '/login',
          //   query: {
          //     //redirect: router.currentRoute.fullPath
          //   }
          // })
          break

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Toast.fail('登录过期，请重新登录')
          // 清除token
          break

        // 404请求不存在
        case 404:
          Toast.fail('网络请求不存在')
          break
        case 504:
          Toast.fail('网关请求超时')
          break
        // 其他错误，直接抛出错误提示
        default:
          Toast.fail('请求错误')
      }
      return Promise.reject(error.response)
    }
  }
)
export default service
