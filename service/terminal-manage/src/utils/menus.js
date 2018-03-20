const api = require("./api");

module.exports = {
  menus: {
    'terminal_manage': [
      {
        name: '终端资源管理',
        code: 'terminal_manage',
        child: [
          {
            name: '终端型号管理',
            code: 'terminal_type_management',
            owner:'SAAS',
            apis: [
              {
                url: api.query_device_models,
                method: 'GET'
              },
              {
                url: api.query_device_models,
                method: 'POST'
              },
              {
                url: api.operateTerminalTypeById,
                method: 'GET'
              },
              {
                url: api.operateTerminalTypeById,
                method: 'PUT'
              },
              {
                url: api.dict_common_types,
                method: 'GET'
              },
            ],
            buttons: [],
          },
          {
            name: '终端资源管理',
            code: 'terminal_resource_management',
            owner:'SAAS_TENANT',
            apis: [
              {
                url: api.query_terminal_resource_list,
                method: 'GET'
              },
              {
                url: api.query_tenants_list_by_ids,
                method: 'GET'
              },
              {
                url: api.query_tenants_list,
                method: 'GET'
              },
              {
                url: api.assigned_tenants,
                method: 'PUT'
              },
              {
                url: api.query_device_models,
                method: 'GET'
              },
              {
                url: api.query_tenants_list,
                method: 'GET'
              },
            ],
            buttons: [
              {
                name: '批量导入',
                code: 'terminal_manage:terminal_resource_management:batchImport',
                owner:'SAAS',
                apis:[
                  {
                    url: api.process,
                    method: 'GET'
                  },
                  {
                    url: api.query_tenants_list,
                    method: 'GET'
                  },
                  {
                    url: api.query_device_models,
                    method: 'GET'
                  },
                  {
                    url: api.upload_file,
                    method: 'POST'
                  },
                  {
                    url: api.importTerminalDevices,
                    method: 'POST'
                  },
                ]
              },
              {
                name: '删除',
                code: 'terminal_manage:terminal_resource_management:delete',
                owner:'SAAS',
                apis:[
                  {
                    url: api.delete_terminal_devices_by_ids,
                    method: 'DELETE'
                  },
                ]
              },
              {
                name: '分配租户',
                code: 'terminal_manage:terminal_resource_management:assigned_tenants',
                owner:'SAAS',
                apis:[
                  {
                    url: api.assigned_tenants,
                    method:'PUT'
                  },
                  {
                    url: api.query_tenants_list,
                    method: 'GET'
                  },
                ]
              },
              {
                name: '调试',
                code: 'terminal_manage:terminal_resource_management:debug',
                owner:'SAAS',
                apis:[
                  {
                    url: api.debug_terminal_devices,
                    method: 'PUT'
                  },
                ]
              }
            ]
          },
          {
            name: '终端导入历史查询',
            code: 'terminal_import_history',
            owner:'SAAS',
            apis: [
              {
                url: api.query_import_device_records,
                method:'GET'
              },
              {
                url: api.download_records,
                method: 'GET'
              },
            ],
            buttons: []
          },
          {
            name: '终端分组管理',
            code: 'terminal_group_management',
            owner:'TENANT',
            apis: [
              {
                url: api.queryTerminalGroup,
                method: 'GET'
              },
              {
                url: api.query_terminal_resource_list,
                method: 'GET'
              },
              {
                url: api.query_device_models,
                method: 'GET'
              },
              {
                url: api.setTerminalDeviceState,
                method: 'PUT'
              }
            ],
            buttons: []
          }
        ]
      },
      {
        name: '终端参数管理',
        code: 'terminal_parameter_management',
        child: [
          {
            name: '终端参数管理',
            code: 'terminal_parameter_management',
            owner:'SAAS',
            apis: [
              {
                url: api.parameters_manage,
                method: 'GET'
              },
              {
                url: api.parameters_manage,
                method: 'PUT'
              }
            ],
            buttons: []
          },
        ]
      },
    ],
  }
}
