import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { nprogress } from 'redux-nprogress';
import async from './async';

const rootReducer = combineReducers({
  routing: routerReducer,
  nprogress,
  async
});

export default rootReducer;
