import request from '../utils/request';
import { baseURL }  from '../utils/config';
import api from '../utils/api';

export async function getList ({ payload }) {
  return request({
    url: baseURL + api.operateSystemApplication,
    method: 'GET',
    params:payload
  })
}
export async function getTerminalTypeList ({ payload }) {
  return request({
    url: baseURL + api.operateTerminalTypeList.replace('*', payload.id),
    method: 'GET',
    params:{
      token: payload.token
   }
  })
}
export async function setTerminalTypeList ({ payload }) {
  return request({
    url: baseURL + api.operateTerminalTypeList.replace('*', payload.id),
    method: 'PUT',
    params:{
      token: payload.token,
    },
    body:payload.device_model_ids
  })
}
export async function addSystemApplication ({ payload }) {
  return request({
    url: baseURL+api.operateSystemApplication,
    method: 'POST',
    params:payload
  })
}
export async function editSystemApplication ({ payload }) {
  return request({
    url: baseURL + api.operateSystemApplicationById.replace('*', payload.id),
    method: 'PUT',
    params:{
      token: payload.token,
      name:payload.name,
      description:payload.description
    }
  })
}
export async function getSysApplications ({ payload }) {
  return request({
    url: baseURL + api.operateSystemApplicationById.replace('*', payload.id),
    method: 'GET',
    params:{
      token: payload.token,
    }
  })
}
export async function deleteSingle ({ payload }) {
  return request({
    url: baseURL+api.operateSystemApplicationById.replace('*', payload.id),
    method: 'DELETE',
    params:{
      token: payload.token
    }
  })
}
export async function deleteMore ({ payload }) {
  return request({
    url: baseURL+api.batchDeleteSystem,
    method: 'DELETE',
    params:payload
  })
}
/* 发布功能已弃用 2018.2.8 */
// export async function issued ({ payload }) {
//   return request({
//     url: baseURL + api.publishingSystem+`/${payload.id}`,
//     method: 'PUT',
//     params:{
//       token: payload.token
//     }
//   })
// }
//
// export async function issuedCancelled ({ payload }) {
//   return request({
//     url: baseURL+api.publishingSystem+`/${payload.id}`,
//     method: 'DELETE',
//     params:{
//       token: payload.token
//     }
//   })
// }
