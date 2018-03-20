import {setLocalStorage, getLocalStorage} from '../../utils';
import { menus } from '../../utils/config';
import {routerRedux} from 'dva/router';

export default {
  namespace : 'home',
  state : {
    languageType: window.appLocale.language,
    token: getLocalStorage("token")
  },
  effects : {
  },
  reducers : {
    init(state,{ payload:{ token,  activeMenu, childMenus, siderMenus, openKeys, selectedKeys } }){
      return {...state, token, activeMenu, childMenus, siderMenus, openKeys, selectedKeys };
    },
    openMenu(state,{ payload:{ openKeys } }){
      return {...state, openKeys }
    },
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        /* 测试使用的初始化权限单元，正式的代码中需要注释掉 */
        // setLocalStorage("permissionButtons",
        //   ['terminal_manage:terminal_resource_management:batchImport',
        //     'terminal_manage:terminal_resource_management:delete',
        //     'terminal_manage:terminal_resource_management:assigned_tenants',
        //     'terminal_manage:terminal_resource_management:debug']);
        const token = getLocalStorage("token");
        let activeMenu = "",childMenus = [],siderMenus = [],openKeys = [],selectedKeys = [];
        if (!token) {
          window.location.href="/";
        }else{
          let path = pathname.split("/");
          for(let key in menus){
              if(path[1]===key){
                activeMenu = key;
                childMenus = menus[key];
                siderMenus = getLocalStorage(key);
                if(!path[2]){
                  dispatch(routerRedux.push(pathname+'/'+siderMenus[0]));
                  path[2] = siderMenus[0];
                }
                childMenus.map(({code,child})=>{
                  const selectedKey = code;
                  child.map(({code})=>{
                    if(code===path[2]){
                      openKeys.push(selectedKey);
                    }
                  });
                });
              }
          }
          selectedKeys.push(path[2]);
          dispatch({type:'init', payload:{token, activeMenu, childMenus, siderMenus, openKeys, selectedKeys}});
        }
      });
    }
  }
}
