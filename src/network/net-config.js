import axios from 'axios'
import Qs from 'qs'
import Vue from 'vue'

export function getNet() {
  const config = {
    baseURL: '/api',
    timeout: 5000,
    // `withCredentials`指示是否跨站点访问控制请求
    withCredentials: true,
    paramsSerializer: function (params) {
      return Qs.stringify(params, { arrayFormat: 'brackets' })
    },
  }
  const net = axios.create(config)
  //添加请求拦截器
  net.interceptors.request.use(
    (request) => {
      if (request.method === 'post' || request.method === 'put') {
        request.data = Qs.stringify(request.data)
      }
      return request
    }, ((error) => {
      Promise.reject(error)
    })
  )

  //添加响应拦截器
  net.interceptors.response.use(
    (response) => {
      if (response.status === 200) {
        // 请求成功
        if (response.data.code === 200 && response.data.data) {
          return response.data.data
        }
        // 请求失败
        if (response.data.code === 400){
          Vue.prototype.$Message.error(response.data.data.msg)
          Promise.reject()
        }
        // 登录过期
        if (response.data.code === 101){
          Vue.prototype.$Message.error(response.data.data.msg)
          Vue.$router.push({path: 'login'})
          Promise.reject()
        }
        return
      }
      console.log('请求错误')
    }, ((error) => {
      Promise.reject(error)
    })
  )
  return net
}