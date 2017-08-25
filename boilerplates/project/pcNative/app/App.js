import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import createHistory from 'history/createHashHistory';
import configureStore from './store/configureStore';
import rootSaga from './redux/sagas';
import Main from './components/Main';


const store = configureStore();
store.runSaga(rootSaga);

const history = createHistory();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={withRouter(Main)} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
