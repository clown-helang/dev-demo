import React from 'react';
import { Router } from 'dva/router';

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1;
  }
}

function validErrorRoute(){
  location.href="/";
}

function RouterConfig({ history, app }) {
  const routes = [
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
          path: '/terminal_manage/terminal_resource_management',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('../models/TerminalManage/TerminalResourceManagement/TerminalResourceManagement/index'));
              cb(null, require('../routes/TerminalManage/TerminalResourceManagement/TerminalResourceManagement/index'));
            }, 'TerminalResourceManagement')
          },
        },
        {
          path: '/terminal_manage/terminal_import_history',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('../models/TerminalManage/TerminalImportHistory/index'));
              cb(null, require('../routes/TerminalManage/TerminalImportHistory/index'));
            }, 'TerminalImportHistory')
          },
        },
        {
          path: '/terminal_manage/terminal_type_management',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('../models/TerminalManage/TerminalTypeManagement/index'));
              cb(null, require('../routes/TerminalManage/TerminalTypeManagement/index'));
            }, 'TerminalTypeManagement')
          },
        },
        {
          path: '/terminal_manage/terminal_resource_management/batchImport',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('../models/TerminalManage/TerminalResourceManagement/BatchImport/index'));
              cb(null, require('../routes/TerminalManage/TerminalResourceManagement/BatchImport/index'));
            }, 'batchImport')
          }
        },
        {
          path: '/terminal_manage/terminal_group_management',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('../models/TerminalManage/TerminalResourceManagement/TerminalGroupManage'));
              cb(null, require('../routes/TerminalManage/TerminalResourceManagement/TerminalGroupManage'));
            }, 'TerminalGroupManage')
          }
        },
        {
          path: '/terminal_manage/terminal_group_management/groupManageSetup',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('../models/TerminalManage/TerminalResourceManagement/GroupManageSetup'));
              cb(null, require('../routes/TerminalManage/TerminalResourceManagement/GroupManageSetup'));
            }, 'GroupManageSetup')
          }
        },
        {
          path: '/terminal_manage/terminal_parameter_management',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('../models/TerminalParameterManagement/index'));
              cb(null, require('../routes/TerminalParameterManagement/index'));
            }, 'TerminalParameterManagement')
          }
        },
      ]
    },
  ];

  return (
    <Router history={history} routes={routes} />
  );
}

export default RouterConfig;
