/**  * 封装Axios  * 处理请求、响应错误信息  */
import { message } from 'ant-design-vue/lib'
import axios from 'axios' //引用axios  
const service = axios.create({
    withCredentials: true,
    timeout: 5000
})
service.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json'
        //config.headers['-Token'] = getToken()
    return config
}, error => {
    return Promise.reject(error)
})
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.resultCode === 10000) {
            return Promise.resolve(res)
        } else {
            message.error(res.resultMsg)
            return Promise.reject(new Error(res.data || 'Error'))
        }
    },
    error => {
        message.error(res)
        return Promise.reject(error)
    }
)
export default service //导出封装后的axios