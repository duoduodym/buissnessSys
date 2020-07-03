import axios from "axios";
import store from "../../store";
import routers from "../../router";
import { refreshToken } from "../../libs/util/utils";
import { checkTenantId } from "@/libs/util/utils";

const prefixAxios = axios.create({
  baseURL: "https://fzg.fzzxwl.com:31886",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Expose-Headers":"Authorization"
  },
  transformRequest:function(data, headers) {
    var result = data;
    if (typeof data === "string") {
      result = JSON.parse(data);
    }
    var resultHeaders = headers;
    if (typeof headers == "string") {
      resultHeaders = JSON.parse(headers);
    }
    const token = store.state.token;
    if (token) {
        resultHeaders["Authorization"] = token;
    } else {
      let localToken = localStorage.token;
      console.log(localToken);
      if (localToken) {
        refreshToken(localToken);
        resultHeaders["Authorization"] = localToken;
      } else {
        routers.push({
          path: "/login",
          query: { redirect: routers.currentRoute.fullPath },
        });
      }
    }
    return result;
  }
});

export function getCosToken() {
  return new Promise((resolve, reject) => {
    prefixAxios
      .get("/tencent-cloud/sts/cos/federation-token/in-tenant-admin")
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

var COS = require('cos-js-sdk-v5');

export function getCos(){
    var cos = new COS({
        getAuthorization: function (options, callback) {
            getCosToken()
            .then(res=>{
                if (res.data.code == 0) {
                    const sessionToken = res.data.data.cosFederationToken.credentials.sessionToken
                    const tmpSecretId = res.data.data.cosFederationToken.credentials.tmpSecretId
                    const tmpSecretKey = res.data.data.cosFederationToken.credentials.tmpSecretKey
                    const startTime = res.data.data.cosFederationToken.startTime
                    const expiredTime = res.data.data.cosFederationToken.expiredTime
                    console.log({
                        TmpSecretId: tmpSecretId,
                        TmpSecretKey: tmpSecretKey,
                        XCosSecurityToken: sessionToken,
                        ExpiredTime: expiredTime,
                        StartTime:startTime
                    })
                    callback({
                        TmpSecretId: tmpSecretId,
                        TmpSecretKey: tmpSecretKey,
                        XCosSecurityToken: sessionToken,
                        ExpiredTime: expiredTime,
                        StartTime:startTime
                    });
                }else{
                    Promise.reject('获取token失败,接口报错')
                }
            })
            .catch(err=>{
                Promise.reject('获取token失败')
            })
        }
    })
    return cos
}

export function pushImage(imageFile){
    return new Promise((resolve,reject)=>{
        var cos = getCos()
        checkTenantId()
        cos.putObject({
            Bucket: 'fzg-1300449266', /* 必须 */
            Region: 'ap-shanghai',     /* 存储桶所在地域，必须字段 */
            Key: store.state.tenantId+'/'+imageFile.name,              /* 必须 */
            StorageClass: 'STANDARD',
            Body: imageFile, // 上传文件对象
            onProgress: function(progressData) {
                console.log(JSON.stringify(progressData));
            }
        }, function(err, data) {
            console.log(err || data);
            if(err){
                reject('上传文件失败')
            }else{
                resolve(data)
            }
        });
    })   
}