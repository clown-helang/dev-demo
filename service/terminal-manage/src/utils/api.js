module.exports = {
  apiPrefix: '/api',//Mock数据接口

  importTerminalDevices:'/terminal-device-service/v1/terminal-devices/import', // 批量导入终端设备 POST
  process:'/terminal-device-service/v1/import-device-records/process', // 查询导入中的导入记录 GET
  query_device_models:'/terminal-device-service/v1/device-models', // 条件分页查询终端型号列表 GET,POST

  query_terminal_resource_list:'/terminal-device-service/v1/terminal-devices',  // GET
  operateTerminalTypeById:'/terminal-device-service/v1/device-models/*',  // GET, PUT
  delete_terminal_devices_by_ids:'/terminal-device-service/v1/terminal-devices/batch', // DELETE
  debug_terminal_devices:'/terminal-device-service/v1/terminal-devices/*/command/*', // PUT
  query_tenants_list:'/auth-service/v1/tenants', // GET
  query_tenants_list_by_ids:'/auth-service/v1/tenants/ids', // GET
  assigned_tenants:'/terminal-device-service/v1/terminal-devices/tenant-relations', // PUT
  query_import_device_records: '/terminal-device-service/v1/import-device-records', // 分页查询终端导入历史 GET
  download_records:'/terminal-device-service/v1/import-device-records/*/import-failed-records/download', // GET

  operateSystemApplication: '/app-content-service/v1/system-applications', // 根据终端型号和系统应用名称或包名模糊分页查询 GET POST
  operateTerminalTypeList: '/app-content-service/v1/system-applications/*/device-models', // GET PUT
  operateSystemApplicationById: '/app-content-service/v1/system-applications/*',  // PUT GET DELETE
  batchDeleteSystem: '/app-content-service/v1/system-applications/batch', // 根据多个系统ID值删除多条系统应用信息 DELETE
  operateImage: '/terminal-device-service/v1/image-contents', // 带分页的查询：根据终端型号或名称得到镜像列表 GET POST
  getImageTerminalTypeList: '/terminal-device-service/v1/image-contents/*/device-models', // GET PUT
  operateImageById: '/terminal-device-service/v1/image-contents/*',//带分页的查询：根据终端型号或名称得到镜像列表 GET PUT DELETE
  batchDeleteImage: '/terminal-device-service/v1/image-contents/batch',//根据多个镜像ID值删除多条镜像信息 DELETE

  operateDifferentialPacket: '/terminal-device-service/v1/image-patchs', // 差分包所有操作一个接口 GET POST
  operateDifferentialPacketById: '/terminal-device-service/v1/image-patchs/*', // 差分包所有操作一个接口 GET PUT DELETE
  batchDeleteDifferentialPacket: '/terminal-device-service/v1/image-patchs/batch',//批量删除差分包接口 DELETE
  queryImageListByDeviceModelId:'/terminal-device-service/v1/image-contents/device-models/*', // GET

  querySystemList:'/app-content-service/v1/system-applications/query',//根据APP包名列表、终端型号id查询包名且终端型号相同的应用信息列表
  getParseInfo:'/app-content-service/v1/system-applications/parse-apk',//根据上传的APK文件信息获取该系统应用的信息'
  deleteImageSingle:'/terminal-device-service/v1/image-contents',//根据镜像id删除镜像信息
  query_device_models_by_id:'/terminal-device-service/v1/device-models/query-ids',// 根据一组终端型号id获取终端型号列表
  upload_file: '/terminal-device-service/v1/temp-files',//上传接口 POST
  deleteTempFile:'/app-content-service/v1/system-applications/temp-file',//根据文件路径删除临时文件

  //2017.11.22新增终端参数管理接口
  parameters_manage:'/terminal-device-service/v1/parameters',    // get, put

  //2018.3.6新增分组查询
  queryTerminalGroup: '/terminal-device-service/v1/terminal-groups',     // GET
  setTerminalDeviceState: '/terminal-device-service/v1/terminal-devices/*/*',     // PUT

  //2018.3.16 新增终端类型和厂商的数据字典查询接口
  dict_common_types: '/terminal-device-service/v1/dict_common_types/*/dict_commons',// GET
};
