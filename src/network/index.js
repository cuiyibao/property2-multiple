/**
 * 接口
 * author: baoyi
 */

import { getNet } from '../net-config'

export const net = getNet()

// API
const API_CHECK_SERVICE = 'check_build_service_dep'

/**
 * 检查当前小区是否设置了服务部门
 */
export function checkService() {
    return net.get(API_CHECK_SERVICE)
}