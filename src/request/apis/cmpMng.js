import {get,post} from '../http'

/**********
 * 新增员工
 * ********* */
export function createEmployees(data){
    return post('/employees',data)
}