import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  routerRedux,
} from 'dva/router';
import dynamic from 'dva/dynamic';

const { ConnectedRouter } = routerRedux;

// 路由表
// const routes = [
//   {
//     path: '/',
//     component: () => import('./routes/App'),
//   },
// ];

const RouterWrapper = (params) => {
  console.log('Router params', params);
  let { history, app } = params;

  const App = dynamic({
    app,
    // models: () => [
    //   import('./models/app'),
    // ],
    component: () => import('./routes/App'),
  });

  const PageForbidden = dynamic({
    app,
    component: () => import('./components/PageForbidden'),
  });

  const PageServerError = dynamic({
    app,
    component: () => import('./components/PageServerError'),
  });

  const PageNetworkError = dynamic({
    app,
    component: () => import('./components/PageNetworkError'),
  });

  const PageNotFound = dynamic({
    app,
    component: () => import('./components/PageNotFound'),
  });

   return (
     <ConnectedRouter history={history}>
       <Switch>
         {/* {
           routes.map( ({path, ...dynamics}, key) => (
             <Route
               key={key}
               exact
               path={path}
               component={dynamic({
                 app,
                 ...dynamics
               })} />
           ))
         } */}
         <Route exact path="/" component={App} />
         {/* 403 */}
         <Route exact path="/403" component={PageForbidden} />
         {/* 500 */}
         <Route exact path="/500" component={PageServerError} />
         {/* 网络错误 */}
         <Route exact path="/error" component={PageNetworkError} />
         {/* 404 */}
         <Route component={PageNotFound} />
       </Switch>
     </ConnectedRouter>
   );
};

RouterWrapper.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

RouterWrapper.defaultProps = {};

export default RouterWrapper;
