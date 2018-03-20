import request from '../utils/request';
import config from '../utils/config';
const { baseURL,api } = config;

export async function changePasswd ({ payload }) {
  return request({
    url: baseURL+api.changepasswd,
    method: 'PUT',
    params:payload,
  })
}
