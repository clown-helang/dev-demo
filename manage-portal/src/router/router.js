import React from 'react';
import { Router } from 'dva/router';

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/login',
      name: 'Login',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('../models/login'));
          cb(null, require('../routes/Login/Login'));
        });
      },
    },
    {
      path: '/',
      name: 'Home',
      getComponent(nextState, cb) {
        require.ensure([], (require) => {
          cb(null, require('../routes/Home/Home'));
        });
      },
      childRoutes:[
        {
          path: '/*',
          name: 'PageNotFound',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('../routes/Error/PageNotFound'));
            });
          },
        },
      ]
    },
  ];

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
