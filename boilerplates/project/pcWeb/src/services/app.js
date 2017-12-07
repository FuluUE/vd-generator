import axios from '../utils/axios';
import Api from '../configs/api';
import config from '../configs/config';

// if (__DEV__) {
//   let data = Mock.mock({
//     "code": "0",
//     "data": {
//       "access_token": "9Brj-z7s3RPKgcGu1thY0CEx9Zn752M-8_ogezdrJgJVHnnlm0h6G1JCH2vPchHJKV--cIyicLTQ3ZwiHUZBB5jb8baH6hyBRKwwvFRB7kBMvTLfTRsaS6mTSsjpdWaeArb9CMd292R6pLKYe10LmLGM7tBHdoNfSw6pEsxUZHUkGUqf6GJ7eVBdNycbvS0hlhdyo4VIagkom8pXkVOKhIW430xNO2eCKU2zJ2-mpbCTVLbErpo5pNG9xcC_XJoOvqj3YWBwTS8lQclwPDHXlLycf66P_feNdAvrZB4eo2vLd0nJqFzA0NO_TEgyyKOtR5N6M3GiRyj1oOn1ps9fEa38_SovakszVAPoVxoW82J9JLzbHntrM4BmtlqdlDlqiE_4GloBCvbab6lwq50j2fkNBO0BaoJgs6MjeKk7uIUD92U2",
//       "token_type": "bearer",
//       "expires_in": 7199,
//       "refresh_token": "Har4RRNn3HfeMjhfMK9-Tc9Pprf_URgfJH9KrMaAD3OC4BTksuKL7ji67BiPjmEH_oYvR4GsJJRr1kpufxyDY-twvnrwTghggm-DhAsFGW_aQanz7S_PmzXHnwebgUiBRRPe9UenQf_zk9hmBsQPydCRTl5cm0IC74ihPtF91UNaxhU4pba7WPqZ77t301NnpP20PMhRt2xFnaac47NS6AFidKgNIjU84nhG7hSa_aeMu5A3vz6lm9LUBpzUfwyQohRX58EG7t7xKOwQVGWm6HPzjBkwScD4YpaK0G8O0sWoIvkvyvu33oHVh5C_RrU_L2833eKjhnrjOs7n-EKgBJkgMRoPLfaFt2OCzps30Oldxw7CAGgv0ipWW6HxD4diz-KcMmQq4SpmC-bKV9iHcK07mNj6_UkjbT9V7Ym24A2B7_SH"
//     },
//     "message_type": "success",
//     "message": "ok"
//   });
//
//   let mock = new MockAdapter(axios);
//
//   // 模拟 200 请求
//   mock.onPost(config.host.login + Api.authorization).reply(200, data);
//
//   // 模拟网络错误请求
//   // mock.onPost(config.host.login + Api.authorization).networkError();
//
//   // 模拟超时请求
//   // mock.onPost(config.host.login + Api.authorization).timeout();
// }

export function getToken(code) {
  return axios({
    method: 'POST',
    url: config.host.login + Api.authorization,
    data: JSON.stringify({
      code: code,
      redirect_uri: encodeURIComponent(window.location.protocol + '//' + window.location.host),
      state: 'xyz',
    }),
  });
}
