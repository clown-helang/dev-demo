import request from '../utils/request';
import { baseURL } from '../utils/config';
import api from '../utils/api'

export async function getParamenter({payload}) {
  return request({
    url:baseURL+api.parameters_manage,
    method: 'GET',
    params:payload
  })
}
export async function editParamenter({payload}) {
  return request({
    url:baseURL+api.parameters_manage,
    method: 'PUT',
    params:payload
  })
}
