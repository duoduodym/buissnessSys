import { get, post, put, Delete } from "../http";

/**********
 * 新增员工
 * ********* */
export function createEmployees(data) {
  return post("/employees", data);
}
/**********
 * 编辑员工
 * ********* */
export function updateEmployees(id, data) {
  return put("/employees/" + id, data);
}
/**********
 * 切换员工状态
 * ********* */
export function switchEmployeesStatus(id, data) {
  return post("/employees/" + id + "/switch-employee-status", data);
}
/**********
 * 删除员工
 * ********* */
export function delEmployees(id) {
  return Delete("/employees/" + id);
}
//绑定员工微信
export function bindingEmployees(id, data) {
  return post(`/employees/${id}/bind-wechat-number`, data);
}

/**********
 * 新增角色
 * ********* */
export function createRole(data) {
  return post("/roles", data);
}
/**********
 * 权限列表
 * ********* */
export function getPermissions() {
  return get("/roles/available-permissions", {});
}
/**********
 * 新增角色
 * ********* */
export function updateRole(id, data) {
  return put("/roles/" + id, data);
}
/**********
 * 删除角色
 * ********* */
export function delRole(id) {
  return Delete("/roles/" + id);
}
/**********
 * 获取角色列表
 * ********* */
export function getRoles() {
  return get("/roles");
}

export function updataCompanyInfo(data){
  return post("/update-tenant-info", data);
}


export function resetPassword(data){
  return post("/reset-password", data);
}