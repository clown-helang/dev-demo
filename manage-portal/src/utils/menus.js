export default [
  //租户管理
  {
    name: '租户管理',
    code: 'tenants_manage',
    service:'tenants-manage',
    child: ['tenants_manage']
  },
  //终端管理
  {
    name: '终端管理',
    code: 'terminal_manage',
    service:'terminal-manage',
    child: ['terminal_type_management','terminal_resource_management','terminal_import_history','terminal_group_management','terminal_parameter_management']
  },
  //应用和镜像管理
  {
    name: '应用和镜像',
    code: 'appManagement',
    service:'app-manage',
    child: ['system_application_management','mobile_application_management','image_management','differential_packet_management','system_application_management_for_tenants','mobile_application_management_for_tenants','image_management_for_tenants','differential_packet_management_for_tenants']
  },
  //酒店管理
  // {
  //   name: '酒店管理',
  //   code: 'hotel_manage',
  //   service:'hotel-manage',
  //   child: ['GuestRoomManage','WelcomeMessage']
  // },

  //客房管理
  {
    name: '客房管理',
    code: 'guestRoom_manage',
    service:'guestRoom-manage',
    child: ['GuestRoomManage','FoodOrdersManage','CleaningServiceManage']
  },
  //消息管理
  {
    name: '消息管理',
    code: 'message_manage',
    service:'message-manage',
    child: ['WelcomeMessage','NotificationMessage','TimingMessageManagement']
  },
  //VAMS
  {
    name: '媒资管理',
    code: 'mediaCapitalManagement',
    service:'VAMS-manage',
    child: ['live_channel_resource_management']
  },
  //VBMS
  {
    name: '业务管理',
    code: 'businessManagement',
    service:'VBMS-manage',
    child: ['service_management']
  },
  //VCMS
  {
    name: '视频管理',
    code: 'contentManagement',
    service:'VCMS-manage',
    child: ['live_channel_management','monolithic_management','album_management','setting_management']
  },
  //门户管理
  {
    name: '门户管理',
    code: 'portalManagement',
    service:'portal-manage',
    child: ['classified_management','template_management','other_setting_management']
  },
  {
    name: '图文管理',
    code: 'information_manage',
    service:'information-manage',
    child: ['graphic_information_manage']
  },
  {
    name: '用户管理',
    code: 'user_manage',
    service:'user-manage',
    child: ['user_manage','list_of_binding_devices']
  },
  // 统计分析Analytics
  {
    name: '统计分析',
    code: 'analyticsManagement',
    service:'analytics-manage',
    child: ['opened_analytics','channel_analytics']
  },
  {
    name: '系统管理',
    code: 'operator_manage',
    service:'operator-manage',
    child: ['operator_manage','role_manage']
  },
]
