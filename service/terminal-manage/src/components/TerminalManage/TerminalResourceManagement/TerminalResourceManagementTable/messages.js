import {defineMessages} from 'react-intl';

const messgaes = defineMessages({
  button: {
    delete: {
      id: "common.BaseUI.button.delete",
      defaultMessage: "删除",
    }
  },
  delete_confirmation:{
    id: 'common.TerminalResourceManagement.delete_confirmation',
    defaultMessage: "确认要删除选中的终端资源吗？",
  },
  active_time:{
    id: 'common.TerminalResourceManagement.active_time',
    defaultMessage: "最后上线时间",
  },
  launcher_version:{
    id: 'common.TerminalResourceManagement.launcher_version',
    defaultMessage: "launcher版本",
  },
  confirmation_warning1:{
    id: 'common.TerminalResourceManagement.confirmation_warning1',
    defaultMessage: '部分终端已分配租户，请确认是否继续操作?',
  },
  confirmation_warning2:{
    id: 'common.TerminalResourceManagement.confirmation_warning2',
    defaultMessage: '确定后更新所属租户，取消后返回。',
  },
  confirmation_warning3:{
    id: 'common.TerminalResourceManagement.confirmation_warning3',
    defaultMessage: '该终端已分配租户，请确认是否继续操作?',
  },
  distribution_tenant: {
    id: 'common.TerminalResourceManagement.distribution_tenant',
    defaultMessage: "分配租户",
  },
  distribution_tenant_NotNull: {
    id: 'common.TerminalResourceManagement.distribution_tenant_NotNull',
    defaultMessage: "请选择要分配的租户",
  },
  placeholder:{
    id: 'common.BaseUI.select.placeholder',
    defaultMessage: "请选择",
  },
  terminal_model: {
    id: 'common.TerminalResourceManagement.terminal_model',
    defaultMessage: "终端型号",
  },
  serial_number: {
    id: 'common.TerminalResourceManagement.serial_number',
    defaultMessage: "序列号",
  },
  tenant: {
    id: 'common.TerminalResourceManagement.tenant',
    defaultMessage: "租户",
  },
  terminal_type: {
    id: 'common.TerminalResourceManagement.terminal_type',
    defaultMessage: "终端类型",
  },
  manufacturer: {
    id: 'common.TerminalResourceManagement.manufacturer',
    defaultMessage: "厂商",
  },
  hardware_version: {
    id: 'common.TerminalResourceManagement.hardware_version',
    defaultMessage: "硬件版本",
  },
  mirror_version: {
    id: 'common.TerminalResourceManagement.mirror_version',
    defaultMessage: "镜像版本",
  },
  creation_time: {
    id: 'common.TerminalResourceManagement.creation_time',
    defaultMessage: "创建时间",
  },
  debug_open: {
    id: 'common.TerminalResourceManagement.debug_open',
    defaultMessage: "打开调试",
  },
  debug_close: {
    id: 'common.TerminalResourceManagement.debug_close',
    defaultMessage: "关闭调试",
  },
  off_line: {
    id: 'common.TerminalResourceManagement.off_line',
    defaultMessage: "离线",
  },
  on_line: {
    id: 'common.TerminalResourceManagement.on_line',
    defaultMessage: "在线",
  },
  statusAndIP: {
    id: 'common.TerminalResourceManagement.statusAndIP',
    defaultMessage: "在线状态/IP地址",
  },
  select_placeholder: {
    id: 'common.BaseUI.select.placeholder',
    defaultMessage: "请选择",
  },
  operation: {
    id: 'common.TerminalTypeManagement.operation',
    defaultMessage: "操作",
  },
});

export default messgaes;
