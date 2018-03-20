import { queryTerminalResourceList, queryTenantsListByIds,assignedTenants,deleteTerminalDevicesByIds,debug,getExtensionInformation } from '../../../../services/TerminalManagement';
import { process } from '../../../../services/BatchImport';
import {Modal} from 'antd';
import { routerRedux } from 'dva/router';
import { isTrue } from '../../../../utils/index';

const init={
  data:{
    total:0,
    contents:[],
  },
  device_model_id:'0',
  serial_number:null,
  assigned_tenant_id:'0',
  page_number:1,
  page_size:10,
  sort_property:'CREATE_TIME',
  sort_direction:'DESC',
  selectedRows:[],
  visible:false,
  filter_assigned_tenant_id:'0',
  filter_device_model_id:'0',
  search_value:null,
};
export default {
  namespace : 'terminal_resource_management',
  state :init,
  effects : {
    //查询终端资源列表
    *queryTerminalResourceList({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let { device_model_id,assigned_tenant_id, serial_number, page_number, page_size,sort_property, sort_direction } = yield select(state => state.terminal_resource_management);
      if(payload!==undefined){
        device_model_id = payload.device_model_id===undefined?device_model_id:payload.device_model_id;
        assigned_tenant_id = payload.assigned_tenant_id===undefined?assigned_tenant_id:payload.assigned_tenant_id;
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
      let _payload = {
        token:token,
        page_size:page_size,
        page_number:page_number,
        sort_property:sort_property,
        sort_direction:sort_direction
      };
      if(device_model_id!=='0'&&isTrue(device_model_id)){
        _payload.device_model_id=device_model_id;
        _payload.page_number=1;
      }
      if(assigned_tenant_id!=='0'&&isTrue(device_model_id)){
        _payload.assigned_tenant_id=assigned_tenant_id;
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
      const {total,datas} = yield call(queryTerminalResourceList, {payload:{..._payload}});
      let ids=[];
      let TenantsList = null;
      if(datas){
        for(let i in datas){
          if(datas[i].assigned_tenant_id){
            if(ids.filter(item =>item === datas[i].assigned_tenant_id).length === 0){
              ids.push(datas[i].assigned_tenant_id)
            }
          }
        }
        if(ids.length>0){
          TenantsList = yield call(queryTenantsListByIds, { payload:{ token,ids } });
        }
        for(let i in datas){
          if(datas[i].assigned_tenant_id){
            for(let j in TenantsList){
              if(datas[i].assigned_tenant_id === TenantsList[j].id){
                datas[i].assigned_tenant_name=TenantsList[j].name;
                break;
              }
            }
          }
          else{
            datas[i].assigned_tenant_name='';
          }
          const ExtensionInformation = yield call(getExtensionInformation,{ payload:{ datas }});
          for(let k in ExtensionInformation.datas){
            let id=datas[i].serial_number+'_'+datas[i].device_model_type+'_'+datas[i].device_model_name+'_'+datas[i].provider;
            if(id===ExtensionInformation.datas[k]._id){
              datas[i].ExtensionInformation = ExtensionInformation.datas[k]._source;
            }
          }
        }
      }
      yield put({type:'setSelectedRows',payload:{selectedRows:[]}});
      yield put({type: 'setData', payload: {  data:{ total:total, contents:datas },device_model_id,assigned_tenant_id, serial_number, page_number, page_size,sort_property, sort_direction }});
    },
    //批量分配租户
    *assignedTenants({ payload:{postData} }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      const response = yield call(assignedTenants, { payload:{ token,...postData} });
      if(response===204){
        yield put({type: 'afterAssignInit'});
        yield put({type: 'queryTerminalResourceList'});
      }
    },
    //批量删除终端资源
    *deleteTerminalDevicesByIds({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      let { data,selectedRows,page_number } = yield select(state => state.terminal_resource_management);
      console.log('data.contents.length',data.contents.length);
      console.log('selectedRows.length',selectedRows.length);
      if(data.contents.length===selectedRows.length){
        page_number--
      }
      const {success_list,fail_list} = yield call(deleteTerminalDevicesByIds, { payload:{ token,ids:selectedRows} });
      if(fail_list.length>0){
        let failedRecord=[];
        for(let i in fail_list){
          const errorResult = window.appLocale.messages[fail_list[i].code];
          failedRecord.push('序列号:'+fail_list[i].serial_number+'        原因:'+errorResult);
        }
        Modal.error({
          title:'批量操作失败',
          content:<div><p>{'失败:'+fail_list.length+'条       成功:'+success_list.length+'条'}</p>{
            failedRecord.map(function (item,index) {
              return <p key={index} style={{whiteSpace: 'pre'}}>{item}</p>;
            })}</div>,
        });
      }
      yield put({type: 'queryTerminalResourceList',payload:{page_number}});
      yield put({type: 'setSelectedRows',payload:{selectedRows:[]}});
    },
    //查询是否有导入中的记录
    *process({ payload }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      const result = yield call(process, { payload:{ token } });
      if(result==204){
        yield put(routerRedux.push('/terminal_manage/terminal_resource_management/batchImport'));
      }else{
        const modal = Modal.warning({
          title: window.appLocale.messages.pleaseNote,
          content: window.appLocale.messages.laterOperation,
        });
        setTimeout(() => modal.destroy(), 10000);
      }
    },
    //向终端发送命令
    *debug({ payload:{id,command} }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      const result = yield call(debug, { payload:{ token,id,command } });
      if(result==204){
        const modal = Modal.success({
          title: command==='DEBUG_OPEN'
            ? window.appLocale.messages.debug_open_success
            : window.appLocale.messages.debug_close_success,
        });
      }
      yield put({type: 'queryTerminalResourceList'});
    },
  },
  reducers : {
    init(state,{payload}){
      const _init={
        data:{
          total:0,
          contents:[],
        },
        device_model_id:'0',
        serial_number:null,
        assigned_tenant_id:'0',
        page_number:1,
        page_size:10,
        sort_property:'CREATE_TIME',
        sort_direction:'DESC',
        selectedRows:[],
        visible:false,
        filter_assigned_tenant_id:'0',
        filter_device_model_id:'0',
        search_value:null,
      };
      return _init;
    },
    afterAssignInit(state,{payload}){
      return { ...state, selectedRows:[], visible:false, assigned_tenant_id:'0'}
    },
    setData(state, {payload: { data,device_model_id,assigned_tenant_id, serial_number, page_number, page_size,sort_property, sort_direction }}) {
      return { ...state, data,device_model_id,assigned_tenant_id, serial_number, page_number, page_size,sort_property, sort_direction };
    },
    setSelectedRows(state,{ payload:{ selectedRows } }){
      return {...state, selectedRows};
    },
    setQueryDeviceModelId(state,{ payload:{ query_device_model_id } }){
      return {...state, query_device_model_id};
    },
    setAssignedTenantId(state,{ payload:{ assigned_tenant_id } }){
      return {...state, assigned_tenant_id};
    },
    setVisible(state,{ payload:{ visible } }){
      return {...state, visible};
    },
    setFilter(state,{ payload}){
      return {...state, ...payload};
    }
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname}) => {
        if (pathname === '/terminal_manage/terminal_resource_management'||pathname === '/terminal_manage/terminal_resource_management_for_tenants') {
          dispatch({type: 'init'});
          dispatch({type: 'queryTerminalResourceList'});
        }else{
          //dispatch({type: 'init'});
        }
      });
    }
  }
}
