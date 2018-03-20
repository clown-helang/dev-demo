import { queryTerminalResourceList, setTerminalDeviceState} from '../../../../services/TerminalManagement';
import { isTrue } from '../../../../utils';
const init={
  data:{},
  device_model_id:'0',
  serial_number:null,
  group_id:'',
  page_number:1,
  page_size:10,
  sort_property:'CREATE_TIME',
  sort_direction:'DESC',
};
export default {
  namespace : 'groupManageSetup',
  state :{},
  effects : {
    //查询终端资源列表
    *queryTerminalResourceList({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let { group_id, device_model_id, serial_number, page_number, page_size,sort_property, sort_direction } = yield select(state => state.groupManageSetup);
      if(payload!==undefined){
        device_model_id = payload.device_model_id===undefined?device_model_id:payload.device_model_id;
        group_id = payload.group_id===undefined?group_id:payload.group_id;
        serial_number = payload.serial_number === undefined?serial_number:payload.serial_number;
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
      let _payload = { token, group_id, page_size, page_number, sort_property, sort_direction };
      if(device_model_id!=='0'&&isTrue(device_model_id)){
        _payload.device_model_id=device_model_id;
        _payload.page_number=1;
      }

      if(serial_number){
        if(serial_number.indexOf('%')>-1||serial_number.indexOf('#')>-1){
          _payload.serial_number = encodeURIComponent(serial_number);
        }else{
          _payload.serial_number = serial_number;
        }
        _payload.page_number=1;
      }
      const {total, datas} = yield call(queryTerminalResourceList, {payload:{..._payload}});
      yield put({type: 'setData', payload: {  data:{ total:total, contents:datas },group_id, device_model_id, serial_number, page_number, page_size,sort_property, sort_direction }});
    },
    *setTerminalDeviceState({ payload: { id, state } }, { put, call, select }){
      const token = yield select(state => state.home.token);
      yield call(setTerminalDeviceState, {payload:{ token, id, state }});
      yield put({type: 'queryTerminalResourceList'});
    },
  },
  reducers : {
    init(state,{payload}){
      return init;
    },
    setData(state, {payload: { data, group_id, page_number, device_model_id, serial_number, page_size, sort_property, sort_direction }}) {
      return { ...state, data, group_id,device_model_id, serial_number, page_number, page_size, sort_property, sort_direction };
    },
    setDeviceModelId(state, {payload: { device_model_id }}) {
      return { ...state, device_model_id };
    },
    setDeviceModelId(state, {payload: { serial_number }}) {
      return { ...state, serial_number };
    },
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/terminal_manage/terminal_group_management/groupManageSetup') {
          dispatch({type: 'init'});
          dispatch({type: 'queryTerminalResourceList',payload:{ group_id: query.group_id }});
        }
      });
    }
  }
}
