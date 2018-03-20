var menus = require('./menus');

module.exports = {
  baseURL: window.baseConfig.baseURL,
  //baseURL: 'http://10.0.251.142:8084',
  apiPrefix: '/api',
  api: {
    userLogin: '/auth-service/v1/users/login',
    permissions:'/auth-service/v1/users/action-permissions',
    changepasswd:'/auth-service/v1/users/passwords',
    Users: '/auth-service/v1/users',
    queryUsers: '/auth-service/v1/users/id',
  },
  menus: menus,
};
