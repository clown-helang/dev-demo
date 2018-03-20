import { defineMessages } from 'react-intl';

const messages = defineMessages({
  TerminalResourceManagement:{
    select_placeholder: {
      id: 'common.BaseUI.select.placeholder',
      defaultMessage: "请选择",
    },
    terminal_resource: {
      id: 'common.TerminalResourceManagement.terminal_resource',
      defaultMessage: '终端资源管理'
    },
    bulk_import: {
      id: 'common.TerminalResourceManagement.bulk_import',
      defaultMessage: '批量导入'
    },
    tenant: {
      id: 'common.TerminalResourceManagement.tenant',
      defaultMessage: '租户'
    },
    all_tenant: {
      id: 'common.TerminalResourceManagement.all_tenant',
      defaultMessage: '全部租户'
    },
    terminal_model: {
      id: 'common.TerminalResourceManagement.terminal_model',
      defaultMessage: '终端型号'
    },
    all_terminal_model: {
      id: 'common.TerminalResourceManagement.all_terminal_model',
      defaultMessage: '全部型号'
    },
    start_serial_number: {
      id: 'common.TerminalResourceManagement.start_serial_number',
      defaultMessage: '序列号起始值'
    },
    end_serial_number: {
      id: 'common.TerminalResourceManagement.end_serial_number',
      defaultMessage: '序列号截止值'
    },
    serial_number: {
      id: 'common.TerminalResourceManagement.serial_number',
      defaultMessage: '序列号'
    },
    where_the_tenant: {
      id: 'common.TerminalResourceManagement.where_the_tenant',
      defaultMessage: '所在租户'
    },
    terminal_type: {
      id: 'common.TerminalResourceManagement.terminal_type',
      defaultMessage: '终端类型'
    },
    manufacturer: {
      id: 'common.TerminalResourceManagement.manufacturer',
      defaultMessage: '厂商'
    },
    hardware_version: {
      id: 'common.TerminalResourceManagement.hardware_version',
      defaultMessage: '硬件版本'
    },
    mirror_version: {
      id: 'common.TerminalResourceManagement.mirror_version',
      defaultMessage: '镜像版本'
    },
    creation_time: {
      id: 'common.TerminalResourceManagement.creation_time',
      defaultMessage: '创建时间'
    },
    distribution_tenant: {
      id: 'common.TerminalResourceManagement.distribution_tenant',
      defaultMessage: '分配租户'
    },
    delete_confirmation: {
      id: 'common.TerminalResourceManagement.delete_confirmation',
      defaultMessage: '确认要删除选中的终端资源吗？'
    },
    error_warning: {
      id: 'common.TerminalResourceManagement.error_warning',
      defaultMessage: '存在尚未处理完成的导入文件，请稍后操作。'
    },
    confirmation_warning: {
      id: 'common.TerminalResourceManagement.confirmation_warning',
      defaultMessage: '部分终端已分配租户，请确认是否继续操作。确定后更新所属租户，取消后返回。'
    },
  },
  button: {
    add: {
      id: 'common.BaseUI.button.add',
      defaultMessage: '添加'
    },
    search: {
      id: 'common.BaseUI.button.search',
      defaultMessage: '搜索'
    },
    edit: {
      id: 'common.BaseUI.button.edit',
      defaultMessage: '编辑'
    },
    delete: {
      id: 'common.BaseUI.button.delete',
      defaultMessage: '删除'
    },
    details:{
      id: 'common.BaseUI.button.details',
      defaultMessage: '详情'
    },
    issued:{
      id: 'common.BaseUI.button.issued',
      defaultMessage: '发布'
    },
    okText: {
      id: "common.BaseUI.button.okText",
      defaultMessage: "确定",
    },
    cancelText: {
      id: "common.BaseUI.button.cancelText",
      defaultMessage: "取消",
    },
  },
  batchImport:{
      title:{
        id: "common.TerminalResourceManagement.batchImport.title",
        defaultMessage: "批量导入",
      },
      deviceModel:{
        id: "common.TerminalResourceManagement.batchImport.deviceModel",
        defaultMessage: "终端型号",
      },
      deviceModelTip:{
        id: "common.TerminalResourceManagement.batchImport.deviceModelTip",
        defaultMessage: "终端型号不能为空",
      },
      hardwareVersion:{
        id: "common.TerminalResourceManagement.batchImport.hardwareVersion",
        defaultMessage: "硬件版本",
      },
      hardwareVersionTip:{
        id: "common.TerminalResourceManagement.batchImport.hardwareVersionTip",
        defaultMessage: "硬件版本不能为空",
      },
      versionCode:{
        id: "common.TerminalResourceManagement.batchImport.versionCode",
        defaultMessage: "初始镜像版本",
      },
      versionCodeTip:{
        id: "common.TerminalResourceManagement.batchImport.versionCodeTip",
        defaultMessage: "初始镜像版本不能为空",
      },
      file:{
        id: "common.TerminalResourceManagement.batchImport.file",
        defaultMessage: "文件",
      },
      fileTip:{
        id: "common.TerminalResourceManagement.batchImport.fileTip",
        defaultMessage: "文件不能为空",
      },

  }
});

export default messages;
