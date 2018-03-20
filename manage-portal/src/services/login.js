import request from '../utils/request';
import config from '../utils/config';
import md5 from 'md5';
import { getBytes } from '../utils';
const { baseURL,api } = config;
const { userLogin } = api;

export async function login ({ payload }) {
  return request({
    url: baseURL+userLogin,
    method: 'POST',
    params:{
      account: payload.account,
      password: md5(getBytes(payload.password)),
      device_type: "pc-web"
    },
  })
}
