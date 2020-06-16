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
		return Promise.resolve(response);
	}, 
	error => {
		if (error) {
			return Promise.reject(error);
		}
	}
)

export function login(params) {  
    return new Promise((resolve, reject) => {         
        axios.post('/login', params)        
        .then(res => {          
            resolve(res.data);        
        })        
        .catch(err => {       
            reject(err)        
        })    
    });
}


//获取企业列表
export function getCompanyList(params) {  
    return new Promise((resolve, reject) => {         
        axios.post('/list-tenant-by-phone', params)        
        .then(res => {          
            resolve(res.data);        
        })        
        .catch(err => {       
            reject(err)        
        })    
    });
}