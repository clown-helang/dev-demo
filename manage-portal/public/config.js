window.baseConfig = {
  baseURL:'http://api-gateway:10080',
  baseZone:-4, //时区设置默认为0时区
  //baseURL:'http://10.0.251.220:30180'
  //baseURL:''
};

window.addEventListener("storage",function (e) {
  if(e.key === null){
    window.location.href='/';
  }else if(e.key ==='token' && e.oldValue !== e.newValue){
    window.location.href='/';
  }
});
