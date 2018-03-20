import { queryTerminalTypeList, addTerminalType, queryTerminalTypeById, editTerminalType,getTerminalDeviceDictionary } from '../../../services/TerminalManagement';

const init={
  data:{
    total:null,
    contents:[]
  },
  page_number:1,
  page_size:10,
  sort_property:'CREATE_TIME',
  sort_direction:'DESC',
  selectedRows:[],
  id:null,
  name: null,
  provider: null,
  device_type: null,
  terminalDeviceTypeList:[],
  terminalDeviceProviderList:[],
  visible:false,
  type:'add',
  search_value:'',
};
export default {
  namespace : 'terminal_type_management',
  state :{},
  effects : {
    //查询终端资源列表
    *queryTerminalTypeList({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let { page_number, page_size,sort_property, sort_direction,search_value } = yield select(state => state.terminal_type_management);
      if(payload!==undefined){
        search_value = payload.search_value===undefined?search_value:payload.search_value;
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
        sort_direction:sort_direction,
      };
      if(search_value){
        if(search_value.indexOf('%')>-1||search_value.indexOf('#')>-1){
          _payload.search_value = encodeURIComponent(search_value);
        }else{
          _payload.search_value = search_value;
        }
      }
      const {total,datas} = yield call(queryTerminalTypeList, {payload:{..._payload}});
      yield put({type:'setSelectedRows',payload:{selectedRows:[]}});
      yield put({type: 'setData', payload: {  data:{ total:total, contents:datas }, page_number, page_size,sort_property, sort_direction }});
    },
    //添加终端型号
    *addTerminalType({payload:{postData}}, { put, call, select}){
      const token = yield select(state => state.home.token);
      yield call(addTerminalType, {payload:{token,...postData}});
      yield put({type: 'init'});
      yield put({type: 'queryTerminalTypeList'});
    },
    //根据ID查询终端型号信息
    *queryTerminalTypeById({payload:{id}}, { put, call, select}){
      const token = yield select(state => state.home.token);
      const response = yield call(queryTerminalTypeById, {payload:{token,id}});
      yield put({type: 'setEditInfor',payload:{ ...response }});
      yield put({type: 'setVisible',payload:{ visible:true }});
      yield put({type: 'setType',payload:{ type:'edit' }});
    },
    //编辑终端型号信息
    *editTerminalType({payload:{postData}}, { put, call, select}){
      const token = yield select(state => state.home.token);
      const { id } = yield select(state => state.terminal_type_management);
      let _payload={token, id, name:postData.name};
      const response = yield call(editTerminalType, {payload:{token,..._payload}});
      yield put({type: 'init'});
      yield put({type: 'queryTerminalTypeList'});
    },
    //查询厂商和终端类型
    *getTerminalDeviceDictionary({payload}, { put, call, select}){
      const token = yield select(state => state.home.token);
      const terminalDeviceProviderList = yield call(getTerminalDeviceDictionary, {payload:{token,type:'terminal_device_provider'}});
      const terminalDeviceTypeList = yield call(getTerminalDeviceDictionary, {payload:{token,type:'terminal_device_type'}});
      yield put({type: 'setProviderAndTypeList',payload:{terminalDeviceProviderList,terminalDeviceTypeList}});
    },
  },
  reducers : {
    init(state,{payload}){
      init.terminalDeviceTypeList = [];
      init.terminalDeviceProviderList = [];
      init.selectedRows = [];
      return init;
    },
    setData(state, {payload: { data,device_model_id,assigned_tenant_id, serial_number, page_number, page_size,sort_property, sort_direction }}) {
      return { ...state, data,device_model_id,assigned_tenant_id, serial_number, page_number, page_size,sort_property, sort_direction };
    },
    setSelectedRows(state,{ payload:{ selectedRows } }){
      return {...state, selectedRows};
    },
    setVisible(state,{ payload:{ visible } }){
      return {...state, visible};
    },
    setEditInfor(state,{ payload:{ id,name,provider,device_type }}){
      return {...state,id,name,provider,device_type};
    },
    setType(state,{ payload:{ type } }){
      return {...state,type};
    },
    setSearchValue(state,{ payload:{ search_value } }){
      return {...state,search_value};
    },
    setProviderAndTypeList(state,{ payload:{ terminalDeviceTypeList, terminalDeviceProviderList } }){
      return {...state, terminalDeviceTypeList, terminalDeviceProviderList};
    }
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/terminal_manage/terminal_type_management') {
          dispatch({type: 'init'});
          dispatch({type: 'queryTerminalTypeList'});
        }else{
        }
      });
    }
  }
}
