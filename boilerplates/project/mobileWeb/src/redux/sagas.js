import ReduxReqs from 'redux-reqs';
import { beginTask, endTask } from 'redux-nprogress';
import { all } from 'redux-saga/effects';
import { watchSagas as asyncSagas } from './async';


ReduxReqs.defaults = {
  beforeAction: beginTask(),
  afterAction: endTask(),
};

export default function* rootSaga() {
  yield all([
    ...asyncSagas
  ]);
}
