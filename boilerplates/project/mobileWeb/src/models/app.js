// import queryString from 'query-string';
import * as appService from '../services/app';


export default {
  namespace: 'app',
  state: {},
  subscriptions: {
    setup({history, dispatch}, onError) {
      // { history: {}, dispatch: (action) => {}}
      // console.log('params1',params1);
      // onError(err)
      // console.log('params2', params2);

      // return history.listen( ({pathname, search}) => {
      //   const query = queryString.parse(search);
      //   if (pathname === '/') {
      //
      //   }
      // });
    }
  },
  effects: {
    *tests(action, {call, put}) {
      // Action
      // { type: 'app/getUserInfo'}
      // console.log(params1);
      // Redux Saga
      // console.log(params2);

      const testRes = yield call(appService.getTest);

      yield put({
        type: 'test',
        payload: {},
      });
    },
  },
  reducers: {
    test(state, {payload}) {
      // State
      // { authorization: { code: '', token: '' } }
      // console.log(params1);
      // Action
      // { type: 'saveUserInfo', payload: {}, @@redux-saga/SAGA_ACTION: true }
      // console.log(params2);

      return {
        ...state,
        ...payload,
      };
    }
  },
};
