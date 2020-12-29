import request from '../requset/requset'
import { baseUrl } from '@/api/base_url.js'
// 任务列表
export const getTaskPage = (params) => {
    return request({
        url: baseUrl + 'device/ecc/page',
        method: 'post',
        params: params
    })
}