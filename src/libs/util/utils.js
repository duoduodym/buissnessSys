import store from "../../store";

function getType(obj) {
  //tostring会返回对应不同的标签的构造函数
  var toString = Object.prototype.toString;
  var map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };
  if (obj instanceof Element) {
    return "element";
  }
  return map[toString.call(obj)];
}

export function deepClone(data) {
  var type = getType(data);
  var obj;
  if (type === "array") {
    obj = [];
  } else if (type === "object") {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === "array") {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === "object") {
    for (var key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
}

export function refreshToken(token) {
  if (localStorage) {
    localStorage.token = token;
  }
  store.state.token = token;
}

export function checkToken() {
  if (!store.state.token) {
    if (localStorage && localStorage.token) {
      store.state.token = localStorage.token;
    }
  }
}

export function refreshCompany(tenantId) {
  if (localStorage) {
    localStorage.tenantId = tenantId;
  }
  store.state.tenantId = tenantId;
}

export function checkTenantId() {
  if (store.state.tenantId) {
    return;
  }
  if (localStorage) {
    let tenantId = localStorage.tenantId;
    store.state.tenantId = tenantId;
  }
}

export function userExit() {
  if (localStorage) {
    localStorage.token = "";
  }
  store.commit("refreshToken", "");
}
