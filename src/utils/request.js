// 封装 axios 请求vm
import Vue from 'vue'
import axios from "axios";
import store from "../store/index";
import Router from 'vue-router'
Vue.use(Router)

// import vm from '../main'
// 创建一个 axios 对象
// 这个创建出来的对象其实与 axios 基本上一致
//  创建出来对象可以设置一些统一的设置：
//      baseURL
// Vue.use()
var request = axios.create({
  baseURL: ""
});

// 设置请求拦截器
request.interceptors.request.use(
  config => {
    //   config.headers = ` ${user.token}`;
    //   config.headers.Cookie = 'D763236DCD0CA64800B4A65E29EF3A89';

    return config;

  },
  error => {
    return Promise.reject(error);
  }
);

// 设置响应拦截器
request.interceptors.response.use(
  function (response) {
    // console.log(response.data.code);
    // 对响应的内容进行过滤处理
    // console.log(Vue);
    
    if (response.data.code == 403) {
      window.location.href="/Home"
     
    }
    return response.data.data || response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 暴露对象
export default request;