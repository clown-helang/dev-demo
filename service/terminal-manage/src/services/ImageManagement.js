import request from '../utils/request';
import { baseURL }  from '../utils/config';
import api from '../utils/api';

export async function getImageList ({ payload }) {
  return request({
    url: baseURL + api.operateImage,
    method: 'GET',
    params:payload
  })
}
export async function getImageTerminalTypeList ({ payload }) {
  return request({
    url: baseURL + api.getImageTerminalTypeList.replace('*', payload.id),
    method: 'GET',
    params:{
      token: payload.token
    }
  })
}
export async function setImageTerminalTypeList ({ payload }) {
  return request({
    url: baseURL + api.getImageTerminalTypeList.replace('*', payload.id),
    method: 'PUT',
    params:{
      token: payload.token,
    },
    body:payload.device_model_ids
  })
}
export async function addImage ({ payload }) {
  return request({
    url: baseURL + api.operateImage,
    method: 'POST',
    params:payload
  })
}
export async function editImage ({ payload }) {
  return request({
    url: baseURL + api.operateImageById.replace('*', payload.id),
    method: 'PUT',
    params:{
      token: payload.token,
      name:payload.name,
      description:payload.description,
      version_code:payload.version_code,
      image_url:payload.image_url,
      info1:payload.info1
    }
  })
}
export async function getImages ({ payload }) {
  return request({
    url: baseURL + api.operateImageById.replace('*', payload.id),
    method: 'GET',
    params:{
      token: payload.token,
    }
  })
}
export async function deleteSingleImage ({ payload }) {
  return request({
    url: baseURL + api.operateImageById.replace('*', payload.id),
    method: 'DELETE',
    params:{
      token: payload.token
    }
  })
}
export async function deleteMoreImage ({ payload }) {
  return request({
    url: baseURL+api.batchDeleteImage,
    method: 'DELETE',
    params:payload
  })
}
/* 发布功能已弃用 2018.2.8 */
// export async function issuedImage ({ payload }) {
//   return request({
//     url: baseURL + api.publishingImage+`/${payload.id}`,
//     method: 'PUT',
//     params:{
//       token: payload.token
//     }
//   })
// }
// export async function issuedCancelledImage ({ payload }) {
//   return request({
//     url: baseURL+api.publishingImage+`/${payload.id}`,
//     method: 'DELETE',
//     params:{
//       token: payload.token
//     }
//   })
// }
