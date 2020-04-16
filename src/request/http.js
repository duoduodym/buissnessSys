import axios from 'axios'
if (process.env.NODE_ENV == 'development') {
	axios.defaults.baseURL = 'https://fzg.fzzxwl.com:31886/tenant-admin';
} else if (process.env.NODE_ENV == 'production') {
	axios.defaults.baseURL = '';
}
// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers['Content-Type'] = 'application/json';
// 请求拦截器
axios.interceptors.request.use(
	config => {
		// 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
		// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
		// const token = store.state.token;        
		// token && (config.headers.Authorization = token);        
		return config;
	},
	error => {
		return Promise.error(error);
	})
// 响应拦截器
axios.interceptors.response.use(
	response => {
        console.log(response)
		return Promise.resolve(response);
	}, 
	error => {
		if (error) {
			return Promise.reject(error);
		}
	}
)
export function get(url, params){    
    params.tenantId = '4ed3e7ff-89b3-4308-87dc-a583d076510d'
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        })        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err.data)        
        })    
    });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {  
    if(!params.tenantId)  params.tenantId = '4ed3e7ff-89b3-4308-87dc-a583d076510d'
    return new Promise((resolve, reject) => {         
        axios.post(url, params)        
        .then(res => {      
            console.log(2222222)            
            resolve(res.data);        
        })        
        .catch(err => {   
            console.log(123123123)         
            reject(err)        
        })    
    });
}
export function put(url, params) {    
    return new Promise((resolve, reject) => {         
        axios.put(url, params)        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}
export function Delete(url) {  
    if(!url.includes('tenantId')){
        url+=`?tenantId=4ed3e7ff-89b3-4308-87dc-a583d076510d`
    }  
    return new Promise((resolve, reject) => {         
        axios.delete(url)        
        .then(res => {            
            resolve(res.data);        
        })        
        .catch(err => {            
            reject(err)        
        })    
    });
}