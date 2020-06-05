import {get,post,put,Delete} from '../http'

/**********
 * 新增分类
 * ********* */
export function createCatetory(data){
    return post('/cost-categories',data)
}
/**********
 * 编辑分类
 * ********* */
export function updateCatetory(id,data){
    return put('/cost-categories/'+id,data)
}
/**********
 * 删除角色
 * ********* */
export function delCatetory(id){
    return Delete('/cost-categories/'+id)
}