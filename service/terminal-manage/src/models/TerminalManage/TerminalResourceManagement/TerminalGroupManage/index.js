import { queryTerminalGroup } from '../../../../services/TerminalManagement';

const init={
  data:{},
  name:'',
  page_number:1,
  page_size:10,
  sort_property:'CREATE_TIME',
  sort_direction:'DESC',
};
export default {
  namespace : 'terminalGroupManage',
  state :{},
  effects : {
    //查询终端资源列表
    *queryTerminalGroup({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let { name, page_number, page_size,sort_property, sort_direction } = yield select(state => state.terminalGroupManage);
      if(payload!==undefined){
        name = payload.name===undefined?name:payload.name;
        sort_property = payload.sort_property===undefined?sort_property:payload.sort_property;
        sort_direction = payload.sort_direction===undefined?sort_direction:payload.sort_direction;
        const payload_search_value = payload.sort_property;
        if(payload_search_value===undefined){
          page_number = payload.page_number || page_number;
        }else{
          page_number = 1;
          sort_property = payload_search_value;
        }
        page_size = payload.page_size || page_size;
      }
      sort_property = sort_property.toUpperCase();
      sort_direction = (sort_direction === 'descend'||sort_direction === 'DESC')?'DESC':'ASC';
      let _payload = {
        token:token,
        page_size:page_size,
        page_number:page_number,
        sort_property:sort_property,
        sort_direction:sort_direction
      };
      if(name){
        if(name.indexOf('%')>-1||name.indexOf('#')>-1){
          _payload.name = encodeURIComponent(name);
        }else{
          _payload.name = name;
        }
        _payload.page_number=1;
      }
      const { total, datas } = yield call(queryTerminalGroup, {payload:{..._payload}});
      yield put({type: 'setData', payload: { data:{ total, contents:datas }, page_number, page_size, sort_property, sort_direction }});
    },
  },
  reducers : {
    init(state,{payload}){
      return init;
    },
    setData(state, {payload: { data, page_number, page_size, sort_property, sort_direction }}) {
      return { ...state, data, page_number, page_size, sort_property, sort_direction };
    },
    setName(state,{ payload: { name }}){
      return { ...state, name };
    },
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/terminal_manage/terminal_group_management') {
          dispatch({type: 'init'});
          dispatch({type: 'queryTerminalGroup'});
        }
      });
    }
  }
}
