import axios from 'axios';
import { Toast } from 'antd-mobile';


// axios.defaults.baseURL = '';
// axios.defaults.withCredentials = true; // 允许跨域且携带 Cookie（或自定义头）
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN; // 携带的自定义头
axios.defaults.timeout = 30000; // 设置超时时间（ms）不超过半分钟


axios.interceptors.request.use(config => {
  // console.log('【request', config);
  return config;
}, error => {
  // console.log('【request error', error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  // console.log('【response', response);
  // 2xx 进入
  return response.data;
}, error => {
  // console.log('【response error', error);

  // 异常进入
  if (error.response) {
      // 请求被执行，服务器以状态码进行响应
      // 2xx、3xx、4xx、5xx
      // console.log('error.response.data', error.response.data);
      // console.log('error.response.status', error.response.status);
      // console.log('error.response.headers', error.response.headers);

      switch (error.response.status) {
        case 401:
        case 502:
          // 401：授权失败或未授权，返回定义的 Status（{status: 401}）；跳转到登录页
          // 502：访问间隔超过指定的时间，返回定义的 Status（{status: 502}）；跳转到登录页
          return error.response.data;
          break;
        case 403:
          // 403：已授权或不需要授权，但禁止访问，返回定义的 Status（{status: 403}）；提示禁止访问
          Toast.info('禁止访问！');
          return error.response.data;
          break;
        case 404:
          // 404：访问接口路径没有找到；跳转到 404 页
          return window.location.href = '/pageNotFound';
          break;
        case 500:
          // 500：接口内部错误；跳转到 500 页
          return window.location.href = '/pageServerError';
          break;
      }
    } else if (error.request) {
      // console.log('error.request', error.request);
      // 请求被提出但是没有收到任何回应
      // 1）HTTPS 跨域请求，需浏览器设置的，新窗口打开异常连接
      return window.location.href = error.request.url;
    } else {
      // console.log('error.message', error.message);
      // 在设置请求时触发错误，发生了一些问题
      // 1）请求超过指定的时间；终止请求
      if (error.message == 'timeout of ' + error.config.timeout + 'ms exceeded') {
        return Toast.info('请求超时，请刷新页面重新请求！');
      }
      // 2）网络错误
      if (error.message == 'Network Error') {
        return window.location.href = '/pageNetworkError';
      }
    }
    // console.log('error.config', error.config);
    return Promise.reject(error);
});
