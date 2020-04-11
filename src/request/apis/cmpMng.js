import {get,post,put} from '../http'

/**********
 * 新增员工
 * ********* */
export function createEmployees(data){
    return post('/employees',data)
}

/**********
 * 新增角色
 * ********* */
export function createRole(data){
    return post('/roles',data)
}
/**********
 * 权限列表
 * ********* */
export function getPermissions(){
    return get('/roles/available-permissions')
}
/**********
 * 新增角色
 * ********* */
export function updateRole(id,data){
    return put('/roles?roleId='+id,data)
}