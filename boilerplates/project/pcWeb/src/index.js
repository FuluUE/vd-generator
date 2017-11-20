import 'babel-polyfill';
import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import { message } from 'antd';


const app = dva({
  history: createHistory(),
  onError(e) {
    message.error(e.message, 3);
  },
});

app.use( createLoading() );

app.router( require('./router') );

app.start('#app');
