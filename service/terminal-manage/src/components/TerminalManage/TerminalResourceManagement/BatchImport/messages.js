import { defineMessages } from 'react-intl';

const messages = defineMessages({
    TerminalResourceManagement:{
      select_placeholder: {
        id: 'common.BaseUI.select.placeholder',
        defaultMessage: "请选择",
      },
      bulk_import: {
        id: 'common.TerminalResourceManagement.bulk_import',
        defaultMessage: '批量导入'
      },
      terminal_model: {
        id: 'common.TerminalResourceManagement.terminal_model',
        defaultMessage: '终端型号'
      },
      hardware_version: {
        id: 'common.TerminalResourceManagement.hardware_version',
        defaultMessage: '硬件版本'
      },
      distribution_tenant: {
        id: 'common.TerminalResourceManagement.distribution_tenant',
        defaultMessage: '分配租户'
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
