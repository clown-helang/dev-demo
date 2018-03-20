import { getLocalStorage } from '../utils';
import { routerRedux } from 'dva/router';
import { getBytes } from '../utils';

const appLocale = window.appLocale;

export default {
  namespace : 'home',
  state : {
    languageType: window.appLocale.language,
    user: getLocalStorage("user"),
    token: getLocalStorage("token"),
  },
  effects : {},
  reducers : {
    init(state,{ payload:{ user, token, headerMenus, headerButtons } }){
      return {...state, user, token, headerMenus, headerButtons };
    },
    setUser(state,{ user }){
      return {...state,user }
    },
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        const token = getLocalStorage("token");
        const user = getLocalStorage("user");
        const headerMenus = getLocalStorage("headerMenus");
        if ( (!token) && pathname !== '/login') {
          dispatch(routerRedux.push("/login"));
        }else{
          dispatch({
            type:'init',
            payload:{user, token, headerMenus }
          });
        }
      });
    }
  }
}
