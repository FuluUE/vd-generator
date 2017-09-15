import React, { Component } from 'react';
import { Provider } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';
// import { ConnectedRouter } from 'react-router-redux';
import './utils/axios';

import Main from './components/Main';
import PageServerError from './components/PageServerError';
import PageNetworkError from './components/PageNetworkError';
import PageNotFound from './components/PageNotFound';
import Async from './containers/Async';


// 定义应用的 Store
import configureStore from './store/configureStore';
import rootSaga from './redux/sagas';

const store = configureStore();
store.runSaga(rootSaga);


export default class App extends Component {
    render () {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/async" component={Async} />
                        <Route exact path="/pageServerError" component={PageServerError} />
                        <Route exact path="/pageNetworkError" component={PageNetworkError} />
                        <Route component={PageNotFound} />
                    </Switch>
                </Router>
            </Provider>
        );
    }
}
