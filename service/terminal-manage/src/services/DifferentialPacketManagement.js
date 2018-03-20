import request from '../utils/request';
import { baseURL }  from '../utils/config';
import api from '../utils/api';

//分页查询差分包数据
export async function getDefferentialPacketList ({ payload }) {
  return request({
    url: baseURL + api.operateDifferentialPacket,
    method: 'GET',
    params: payload
  })
}

//根据id查询差分包信息
export async function getDifferentialPacketById ({ payload }) {
  return request({
    url: baseURL + api.operateDifferentialPacketById.replace('*', payload.id),
    method: 'GET',
    params: {
      token: payload.token
    }
  })
}

//添加差分包数据
export async function addDifferentialPacket ({ payload }) {
  return request({
    url: baseURL+api.operateDifferentialPacket,
    method: 'POST',
    params: payload
  })
}

//根据ID更新差分包数据
export async function updateDifferentialPacket ({ payload }) {
  return request({
    url: baseURL + api.operateDifferentialPacketById.replace('*', payload.id),
    method: 'PUT',
    params: {
      token: payload.token,
      patch_url:payload.patch_url,
      name:payload.name,
      image_content_id:payload.image_content_id,
      description:payload.description,
      info1:payload.info1,
    }
  })
}

//根据ID删除差分包数据
export async function deleteDifferentialPacketById ({ payload }) {
  return request({
    url: baseURL + api.operateDifferentialPacketById.replace('*', payload.id),
    method: 'DELETE',
    params: {
      token: payload.token
    }
  })
}
//批量删除差分包数据
export async function deleteDifferentialPacket ({ payload }) {
  return request({
    url: baseURL + api.batchDeleteDifferentialPacket,
    method: 'DELETE',
    params: payload
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

//根据镜像ID查询终端类型列表
export async function queryDeviceModelsById ({ payload }) {
  return request({
    url: baseURL+api.getImageTerminalTypeList.replace('*', payload.id),
    method: 'GET',
    params: {
      token:payload.token
    }
  })
}

//根据终端类型ID查询镜像列表
export async function queryImageListById ({ payload }) {
  return request({
    url: baseURL + api.queryImageListByDeviceModelId.replace('*', payload.id),
    method: 'GET',
    params: {
      token:payload.token
    }
  })
}

//根据镜像ID查询镜像列表
export async function getImageListByImageId ({ payload }) {
  return request({
    url: baseURL + api.operateImageById.replace('*', payload.id),
    method: 'GET',
    params: {
      token:payload.token
    }
  })
}
//查询终端类型列表
export async function getTerminalTypeList ({ payload }) {
  return request({
    url: baseURL+api.operateTerminalTypeList.replace('*', payload.id),
    method: 'GET',
    params:{
      token: payload.token
    }
  })
}

/* 发布功能已弃用 2018.2.8 */
// //发布差分包数据
// export async function publishDifferentialPacket ({ payload }) {
//   return request({
//     url: baseURL + api.publish_differential_packet+'/'+payload.id,
//     method: 'PUT',
//     params: {
//       token:payload.token
//     }
//   })
// }
// //取消发布差分包数据
// export async function cancelPublishDifferentialPacket ({ payload }) {
//   return request({
//     url: baseURL + api.publish_differential_packet+'/'+payload.id,
//     method: 'DELETE',
//     params: {
//       token:payload.token
//     }
//   })
// }

