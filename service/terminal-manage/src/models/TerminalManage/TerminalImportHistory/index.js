import { queryImportDevicesRecords, downloadRecords } from '../../../services/TerminalManagement';
const Init={
  data:{total:null,contents:[]},
  selectedRows:[],
  page_size:10,
  page_number:1,
  sort_direction:'DESC',
  sort_property:'CREATE_TIME',
};
export default {
  namespace : 'terminal_import_history',
  state : Init,
  effects : {
    *queryImportDevicesRecords({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let {  sort_property, sort_direction, page_number, page_size } = yield select(state => state.terminal_import_history);
      if(payload!==undefined){
        sort_property = payload.sort_property===undefined?sort_property:payload.sort_property;
        sort_direction = payload.sort_direction===undefined?sort_direction:payload.sort_direction;
        const payload_search_value = payload.sort_property;
        if(payload_search_value === undefined){
          page_number = payload.page_number || page_number;
        }else{
          page_number = 1;
          sort_property = payload_search_value;
        }
        page_size = payload.page_size || page_size;
      }
      sort_property = sort_property.toUpperCase();
      sort_direction = (sort_direction == 'descend'||sort_direction == 'DESC')?'DESC':'ASC';

      const data = yield call(queryImportDevicesRecords,
        { payload:{
          token,
          page_size:page_size,
          page_number:page_number,
          sort_direction:sort_direction,
          sort_property:sort_property,
        } });
      yield put({type: 'setPageSizeAndPageNumber', payload: { page_size,page_number }});
      yield put({type:'setSelectedRows',payload:{selectedRows:[]}});
      yield put({type: 'setData', payload: {  data:{total:data.total,contents:data.datas} }});
    },
    *downloadRecords({ payload:{id} }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      yield call(downloadRecords, { payload:{token, id} });
    },
  },
  reducers : {
    Init(state,{payload}){
      const _init={
        data:{total:null,contents:[]},
        selectedRows:[],
        page_size:10,
        page_number:1,
        sort_direction:'DESC',
        sort_property:'CREATE_TIME',
      };
      return _init;
    },
    setData(state,{payload:{data}}){
      return {...state,data}
    },
    setSelectedRows(state,{payload:{selectedRows}}){
      return {...state,selectedRows}
    },
    setPageSizeAndPageNumber(state,{payload:{page_size,page_number}}){
      return {...state,page_size,page_number}
    }
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/terminal_manage/terminal_import_history') {
          dispatch({type: 'Init'});
          dispatch({type: 'queryImportDevicesRecords'});
        }else{
          //clearInterval(window.intervalId);
        }
      });
    }
  }
}
