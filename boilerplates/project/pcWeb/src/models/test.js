// import queryString from 'query-string';
// import * as testService from '../services/test';


export default {
  namespace: 'test',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen( ({pathname, search}) => {
        // const query = queryString.parse(search);
        // if (pathname === '/test') {
        //   dispatch({type: 'fetch', payload: query});
        // }
      });
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      // const { data } = yield call(testService.getData);
      // yield put({
      //   type: 'get',
      //   payload: {
      //     data,
      //   }
      // });
    },
  },
  reducers: {
    get(state, { payload }) {
      // return {
      //   ...state,
      //   payload,
      // }
    },
  },
}
