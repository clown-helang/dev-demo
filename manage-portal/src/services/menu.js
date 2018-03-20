import request from '../utils/request'
import config from '../utils/config'
const { baseURL,api } = config
const { permissions } = api

export async function getPermissions ({ payload }) {
  return request({
    url: baseURL+permissions,
    method: 'GET',
    params:payload,
  })
}
