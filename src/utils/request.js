import axios from 'axios'
import { notification } from 'antd';
import { getToken } from '@/utils/auth';
import Config from '@/settings';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_BASE_API : '/', // api 的 base_url
  timeout: Config.timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.status
    if (code < 200 || code > 300) {
      notification.open({
        message: code,
        description: response.message,
        onClick: () => {
          
        },
      });
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    let code = 0
    try {
      code = error.response.data.status
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        notification.open({
          message: "网络请求超时",
          description: "",
          onClick: () => {
            
          },
        });
        return Promise.reject(error)
      }
    }
    if (code) {
      if (code === 401) {
        window.location.reload();
        // store.dispatch('LogOut').then(() => {
        //   // 用户登录界面提示
        //   Cookies.set('point', 401)
        //   location.reload()
        // })
      } else if (code === 403) {
        // router.push({ path: '/401' })
      } else {
        const errorMsg = error.response.data.message
        if (errorMsg !== undefined) {
          notification.open({
            message: errorMsg,
            description: "",
            onClick: () => {
              
            },
          });
        }
      }
    } else {
      notification.open({
        message: '接口请求失败',
        description: "",
        onClick: () => {
          
        },
      });
    }
    return Promise.reject(error)
  }
)
export default service
