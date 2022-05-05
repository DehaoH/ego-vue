//axios请求拦截，响应拦截的封装
import axios from 'axios'
import qs from 'querystring'

//4.error信息的处理
const errorHandler = (status, info) => {
    switch (status) {
        case 400:
            console.log("语义错误");
            break;
        case 401:
            console.log("服务器认证失败");
            break;
        case 403:
            console.log("服务器请求拒接");
            break;
        case 404:
            console.log("请检查网络请求地址");
            break;
        case 500:
            console.log("服务器发生意外");
            break;
        case 502:
            console.log("服务器无响应");
            break;
        default:
            console.log(info);
            break;
    }
}

//1.创建网络请求实例
const http = axios.create({
    timeout: 5000
})

//2.请求拦截
http.interceptors.request.use(
    config => {
        if (config.method == 'post') {
            config.data = qs.stringify(config.data)
        }
        return config;  //一定要return config
    },
    error => Promise.reject(error)
)

//3.响应拦截
http.interceptors.response.use(
    response => response.status == 200 ? Promise.resolve(response) : Promise.reject(response),
    error => {
        const {response} = error;
        if (response) {
            errorHandler(response.status, response.info);
        }
    }
)

export default http