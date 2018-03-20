import { importTerminalDevices } from '../../../../services/BatchImport';
import { routerRedux } from 'dva/router';
import { Modal } from 'antd';
const init = {
  file_path: '',
  tenant_id: '0',//所属租户id
  device_model_id: '',
  hardware_version: '',
  version_code: '',
};
export default {
  namespace : 'batchImport',
  state : {},
  effects : {
    *importTerminalDevices ({ payload:{ postData} }, { put, call, select }) {
      const token = yield select(state => state.home.token);
      const result = yield call( importTerminalDevices,{ payload:{ token,...postData } });
      yield put(routerRedux.push('/terminal_manage/terminal_resource_management'));
      const modal = Modal.success({
        title: '导入文件处理中！',
        content: '请刷新页面，或到终端导入历史查询页面查看导入详情',
      });
      setTimeout(() => modal.destroy(), 10000);
    },
  },
  reducers : {
    init(state,{payload}){
      return init;
    },
    setInitData(state,{payload: { file_path, tenant_id, device_model_id, hardware_version, version_code }}) {
      return { ...state, file_path, tenant_id, device_model_id, hardware_version, version_code};
    },
    setAssignedTenantId(state,{ payload:{ tenant_id } }){
      return {...state, tenant_id};
    },
  },
  subscriptions : {
    setup({dispatch, history}) {
      return history.listen(({pathname,query}) => {
        if (pathname === '/terminal_manage/terminal_resource_management/batchImport') {
          dispatch({type: 'init'});
        }
      });
    }
  }
}
