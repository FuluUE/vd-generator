import axios from '../utils/axios';
import Api from '../configs/api';
import config from '../configs/config';

// if (__DEV__) {
//   let data = Mock.mock({
//     "code": "0",
//     "data": {
//       "access_token": "9Brj-z7s3RPKgcGu1thY0CEx9Zn752M-8_ogezdrJgJVHnnlm0h6G1JCH2vPchHJKV"
//     },
//     "message_type": "success",
//     "message": "ok"
//   });
//
//   let mock = new MockAdapter(axios);
//
//   // 模拟 200 请求
//   mock.onGet(Api.test).reply(200, data);
//
//   // 模拟网络错误请求
//   // mock.onPost(Api.test).networkError();
//
//   // 模拟超时请求
//   // mock.onPost(Api.test).timeout();
// }

export function getTest() {
  return axios({
    method: 'get',
    url: Api.test,
  });
}
