import request from '../utils/request';
import { baseURL }  from '../utils/config';
import api from '../utils/api';
import elasticsearch from 'elasticsearch'
//创建elasticsearch实例
const client = new elasticsearch.Client({
  host: baseURL
});
//获取设备在线状态和IP地址
export async function getExtensionInformation ({payload}) {
  const ids=[];
  payload.datas.map((item)=>{
    let id=item.serial_number+'_'+item.device_model_type+'_'+item.device_model_name+'_'+item.provider;
    ids.push(id)
  });
  return client.search({
    index: 'app_dm',
    type: 'dm_device_live_mi',
    body: {
      size:ids.length,
      "query": {
        "terms": {
          "_id": ids
        }
      }
    }
  }).then(function (resp) {
    const hits = resp.hits.hits;
    return Promise.resolve({total:hits.length,datas:hits});
  }, function (err) {
    console.trace(err.message);
  });
}


//查询终端资源列表
export async function queryTerminalResourceList ({ payload }) {
  return request({
    url: baseURL + api.query_terminal_resource_list,
    method: 'GET',
    params: payload,
  })
}

//查询终端型号列表
export async function queryTerminalTypeList ({ payload }) {
  return request({
    url: baseURL + api.query_device_models,
    method: 'GET',
    params: payload,
  })
}

//添加终端型号
export async function addTerminalType ({ payload }) {
  return request({
    url: baseURL + api.query_device_models,
    method: 'POST',
    params: payload,
  })
}

//根据ID查询终端型号
export async function queryTerminalTypeById ({ payload }) {
  return request({
    url: baseURL + api.operateTerminalTypeById.replace('*',payload.id),
    method: 'GET',
    params: {
      token:payload.token
    },
  })
}

//编辑终端型号
export async function editTerminalType ({ payload }) {
  return request({
    url: baseURL + api.operateTerminalTypeById.replace('*',payload.id),
    method: 'PUT',
    params: {
      token:payload.token,
      name:payload.name,
    },
  })
}


//查询终端资源列表
export async function deleteTerminalDevicesByIds ({ payload }) {
  return request({
    url: baseURL + api.delete_terminal_devices_by_ids,
    method: 'DELETE',
    params: payload,
  })
}

//向终端远程发送命令
export async function debug ({ payload }) {
  return request({
    url: baseURL + api.debug_terminal_devices.replace('*', payload.id).replace('*', payload.command),
    method: 'PUT',
    params: {
      token:payload.token,
    },
  })
}

//获取租户列表
export async function queryTenantsList ({ payload }) {
  return request({
    url: baseURL+api.query_tenants_list,
    method: 'GET',
    params: payload,
  })
}


//根据一组租户id获取租户列表
export async function queryTenantsListByIds ({ payload }) {
  return request({
    url: baseURL+api.query_tenants_list_by_ids,
    method: 'GET',
    params: payload,
  })
}
//批量分配租户
export async function assignedTenants ({ payload }) {
  return request({
    url: baseURL+api.assigned_tenants,
    method: 'PUT',
    params: payload,
  })
}

//查询终端导入历史记录
export async function queryImportDevicesRecords ({ payload }) {
  return request({
    url: baseURL+api.query_import_device_records,
    method: 'GET',
    params: payload,
  })
}

//下载失败记录excel文件
export async function downloadRecords ({ payload }) {
  window.open(baseURL+api.download_records.replace('*', payload.id));
}

//查询终端分组列表
export async function queryTerminalGroup ({ payload }) {
  return request({
    url: baseURL+api.queryTerminalGroup,
    method: 'GET',
    params: payload,
  })
}

//设置终端环境状态
export async function setTerminalDeviceState ({ payload }) {
  return request({
    url: baseURL+api.setTerminalDeviceState.replace('*',payload.id).replace('*',payload.state ),
    method: 'PUT',
    params: {
      token: payload.token
    },
  })
}
//数据字典查询终端厂商，终端类型
export async function getTerminalDeviceDictionary ({ payload }) {
  return request({
    url: baseURL+api.dict_common_types.replace('*',payload.type),
    method: 'GET',
    params: {
      token: payload.token
    },
  })
}
