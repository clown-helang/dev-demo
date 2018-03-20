import fetch from 'dva/fetch';
import config from './config';

const { baseURL } = config;

function parse(response) {
  if (response.status == 200) {
    return response.json().then(res => Promise.resolve(res));
  }else if (response.status == 204) {
    return response.text().then(() => Promise.resolve(204));
  }else if (response.status == 401) {
    return response.text().then(res => Promise.reject({message:401}));
  }else{
    return response.text().then(res => {
      const result = JSON.parse(res);
      if(result.code){
        return Promise.reject(result.code)
      }else{
        return Promise.reject({message:result.constraintViolations[0].message})
      }
    });
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {string} method
 * @param  {object} [params] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(arr) {
  //增加options的封装
  let options = {
    method: arr.method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      "Accept": "application/json;charset=utf-8",
      //"x-tenantid": "14"
    }
  }
  if(arr.params.token){
    options.headers.Authorization = 'Bearer '+arr.params.token;
    delete arr.params.token;
  }
  let real_url = arr.url;
  if(arr.method=='POST'||arr.method=='PUT'){
    if(arr.body){
      options.body = JSON.stringify(arr.body);
    }else{
      options.body = JSON.stringify(arr.params);
    }
  }else{
    real_url = real_url + '?';
    for(let key in arr.params){
      real_url += key + '=' + arr.params[key] + '&';
    }
    real_url = real_url.substr(0,real_url.length-1);
  }
  return fetch(real_url, options)
    .then(parse);
}
