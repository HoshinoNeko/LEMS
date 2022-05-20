// 添加请求拦截器
instance.interceptors.request.use(
    config => {
      // 在发送请求之前做些什么
      // 获取 token
      if (localStorage.getItem('token')) {
        // 添加 token 请求头
        config.headers.Authorization = localStorage.getItem('token')
      }
      return config;
    },
    error => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    response => {
      // 对响应数据做点什么
      // 隐藏加载图
      // 获取code，对不同码执行不同逻辑
      const res = response.data;
      // 返回成功
      if (res === 200) {
        return res;
      }
      // token 异常
      if (res === 508 || res === 512 || res === 514) {
        // 登出 清除token缓存
      }
      console.log("res", response);
      return response;
    },
    error => {
      // 对响应错误做点什么
      return Promise.reject(error);
    }
);
import axios from "axios"; // 引用axios
import config from "./config";

const instance = axios.create({
  baseURL: config.baseUrl.dev,
  timeout: 60000,
});
//get请求
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    instance
        .get(url, {
          params: params,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
  });
}
//post请求
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(
        (response) => {
          resolve(response.data);
        },
        (err) => {
          reject(err);
        }
    );
  });
}
