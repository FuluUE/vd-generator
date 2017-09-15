## 业务（Async）组件使用示例

#### App.js

添加路由，加载相应的组件。

#### redux/async.js

伪造请求数据，通过请求拦截器拦截请求将伪造数据作为返回值。

```javascript
if (__DEV__) {
  let data = Mock.mock({
    "status": 200,  // 状态码
    "data|0-9": {
      "id": "@guid",
      "name": "@cname",
      "address": "@county(true)",
      "website": "@url",
      "email": "@email"
    },     // 数据内容
    "code": "001",  // 业务返回码
    "message": ""   // 消息文本（有业务返回码时，此字段可不显示）
  });

  console.log('(1) data',data);

  let mock = new MockAdapter(axios);
  // 模拟 200 请求
  mock.onGet(Api.getDatas).reply(data.status, data);
  // 模拟网络错误请求
  // mock.onGet(Api.getData).networkError();
  // 模拟超时请求
  // mock.onGet(Api.getData).timeout();
}
```

#### containers/Async.js

在容器组件内过滤 state，传递 Action 给展示组件。

#### components/Async/Async.js

渲染异步请求的数据。
