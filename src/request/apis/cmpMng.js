import {get,post,put,Delete} from '../http'

/**********
 * 新增员工
 * ********* */
export function createEmployees(data){
    return post('/employees',data)
}
/**********
 * 编辑员工
 * ********* */
export function updateEmployees(id,data){
    return put('/employees/'+id,data)
}
/**********
 * 删除员工
 * ********* */
export function delEmployees(id){
    return Delete('/employees/'+id)
}
//绑定员工微信
export function bindingEmployees(id,data){
    return post(`/employees/${id}/bind-wechat-number`,data)
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
    return get('/roles/available-permissions',{})
}
/**********
 * 新增角色
 * ********* */
export function updateRole(id,data){
    return put('/roles/'+id,data)
}
/**********
 * 删除角色
 * ********* */
export function delRole(id){
    return Delete('/roles/'+id)
<<<<<<< HEAD
}
/**********
 * 获取角色列表
 * ********* */
export function getRoles(){
    return get('/roles')
}
=======
}
>>>>>>> origin/master
