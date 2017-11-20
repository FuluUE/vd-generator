import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  routerRedux,
} from 'dva/router';
import dynamic from 'dva/dynamic';


const { ConnectedRouter } = routerRedux;

const Routers = ({ history, app }) => {

  const Main = dynamic({
    app,
    component: () => import('./components/Main'),
  });

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Main} />;
      </Switch>
    </ConnectedRouter>
  );
};

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

Routers.defaultProps = {};

export default Routers;
