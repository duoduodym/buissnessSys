import axios from "axios";
import { refreshToken } from "../../libs/util/utils";
const prefixAxios = axios.create({
  baseURL: "https://fzg.fzzxwl.com:31886/tenant-admin",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  transformResponse: function(data, headers) {
    var result = data;
    if (typeof data === "string") {
      result = JSON.parse(data);
    }
    var resultHeaders = headers;
    if (typeof headers == "string") {
      resultHeaders = headers;
    }
    console.log(resultHeaders);
    if (resultHeaders["set-authorization"]) {
      refreshToken(resultHeaders["set-authorization"]);
    }
    return result;
  },
});

export function login(params) {
  return new Promise((resolve, reject) => {
    prefixAxios
      .post("/login", params)
      .then((res) => {
        console.log(res);

        if (res.headers) {
          let token = res.headers["set-authorization"];
          refreshToken(token);
        }
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

//获取企业列表
export function getCompanyList(params) {
  return new Promise((resolve, reject) => {
    prefixAxios
      .post("/list-tenant-by-phone", params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
