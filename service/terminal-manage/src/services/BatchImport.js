import request from '../utils/request';
import { baseURL }  from '../utils/config';
import api from '../utils/api';

export async function importTerminalDevices ({ payload }) {
  return request({
    url: baseURL+api.importTerminalDevices,
    method: 'POST',
    params:payload
  })
}
export async function process ({ payload }) {
  return request({
    url: baseURL+api.process,
    method: 'GET',
    params:payload
  })
}

//查询终端类型列表
export async function queryDeviceModels ({ payload }) {
  return request({
    url: baseURL+api.query_device_models,
    method: 'GET',
    params: payload
  })
}


