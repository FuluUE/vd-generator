import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux';
import { nprogressMiddleware } from 'redux-nprogress';
import rootReducer from '../redux/reducers';

const history = createHistory();

const configureStore = () => {

  // 创建 Saga 中间件
  const sagaMiddleware = createSagaMiddleware();

  // 创建路由中间件
  const routingMiddleware = routerMiddleware(history);

  // 开启 Redux DevTools
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // 创建 Store
  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        routingMiddleware,
        nprogressMiddleware(),
      )
    ), // 应用中间件
  );

  return {
    ...store,
    runSaga: sagaMiddleware.run
  };
};

export default configureStore;
