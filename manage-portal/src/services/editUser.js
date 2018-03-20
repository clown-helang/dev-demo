import request from '../utils/request'
import config from '../utils/config'
const { baseURL,api } = config;
const { Users,queryUsers } = api;

export async function queryUserById ({ payload }) {
  return request({
    url: baseURL+queryUsers,
    method: 'GET',
    params:{
      token:payload.token
    },
  })
}
export async function editUser ({ payload }) {
  return request({
    url: baseURL+Users,
    method: 'PUT',
    params:payload,
  })
}
