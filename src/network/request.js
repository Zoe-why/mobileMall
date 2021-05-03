/**
 * 封装axios
 */
// 导入相关
import axios from 'axios'

export function request (config) {
  //   创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })
  // 2.axios的拦截器
  // 2.1.请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })
  // 3、发送请求
  return instance(config)
}
