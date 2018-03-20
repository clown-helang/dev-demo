import { getParamenter,editParamenter } from '../../services/TerminalParamenterManagement';
const messages = window.appLocale.messages;
import { routerRedux } from 'dva/router'

const init={
  data:{}
};
export default {
  namespace : 'terminal_parameter_management',
  state :{},
  effects : {
    //查询终端资源列表
    *getParamenter({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      const result = yield call(getParamenter, {payload:{token}});
      let contents = [];
      if(result.length>0){
        result.map((item,index) =>{
          contents.push({
            id:index,
            name:messages[item.code],
            ...item,
          })
        });
      }
      yield put({type: 'setData', payload: { data:{ total:contents.length, contents }}});
    },
    //添加终端型号
    *editParamenter({payload:{code,value}}, { put, call, select}){
      const token = yield select(state => state.home.token);
      yield call(editParamenter, {payload:{token,code,value}});
      yield put({type: 'getParamenter'});
    },
  },
  reducers : {
    init(state,{payload}){
      return init;
    },
    setData(state,{payload:{data}}){
      return {...state,data};
    },
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/terminal_manage/terminal_parameter_management') {
          dispatch({type: 'init'});
          dispatch({type: 'getParamenter'});
        }else{
        }
      });
    }
  }
}
