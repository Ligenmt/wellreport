import axios from 'axios'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.BASE_API, // url = base url + request url
  timeout: 100000 // request timeout
})

// request interceptor
// service.interceptors.request.use(
//   config => {
//     if (store.getters.token) {
//       config.headers['token'] = getToken()
//     }
//     return config
//   },
//   error => {
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

// response interceptor
service.interceptors.response.use(
  response => {
    const data = response.data
    if (data.code !== 200) {
      return Promise.reject(data)
    } else {
      return response
    }
  },
  error => {
    console.log('err info:' + error) // for debug
    console.log('err status: ' + error.response.status)
    return Promise.reject(error)
  }
)

export default service
