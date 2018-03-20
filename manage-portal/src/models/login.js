import {login} from '../services/login';
import {getPermissions} from '../services/menu';
import { setLocalStorage } from '../utils';
import { menus, buttons } from '../utils/config';
import {routerRedux} from 'dva/router';

export default {
  namespace : 'login',
  state : {
    loginLoading: false
  },
  effects : {
    *login({payload}, {put, call, select}) {
      let url = '/';
      yield put({type: 'showLoginLoading'});
      const result = yield call(login, {payload});
      const { name, token, tenant_id } = result;
      setLocalStorage('user', name);
      setLocalStorage('token', token);
      setLocalStorage('tenant_id',tenant_id);
      const permissions  = yield call(getPermissions, { payload:{ token } });
      let permissionMenus = {};
      let permissionButtons = [];

      menus.map((menu)=>{
        permissions.map((item)=>{
          if(item.permission_type==='MENU'){
            if(menu.child.indexOf(item.code)>=0){
              if(url==='/')url = '/' + menu.service + '/#/' + menu.code + '/' + item.code;
              if(permissionMenus[menu.code]){
                permissionMenus[menu.code].push(item.code);
              }else{
                permissionMenus[menu.code] = [];
                permissionMenus[menu.code].push(item.code);
              }
            }
          }
        })
      });
      permissions.map((item)=>{
        if(item.permission_type==='FUNCTION'){
          permissionButtons.push(item.code);
        }
      });
      let headerMenus = [];
      for(let key in permissionMenus){
        headerMenus.push(key);
        setLocalStorage(key, permissionMenus[key]);
      }
      setLocalStorage('headerMenus', headerMenus);
      setLocalStorage('permissionButtons', permissionButtons);
      window.location.href = url;
    }
  },
  reducers : {
    showLoginLoading(state) {
      return {...state,loginLoading: true}
    },
    hideLoginLoading(state) {
      return {...state,loginLoading: false}
    }
  }
}
