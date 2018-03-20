import {defineMessages} from 'react-intl';

const messages = defineMessages({
  table: {
    'total': {
      id: 'common.BaseUI.table.total',
      defaultMessage: '共'
    },
    'result': {
      id: 'common.BaseUI.table.result',
      defaultMessage: '条数据'
    }
  },
  all_model: {
    id: 'common.searchSelect.all_model',
    defaultMessage: '全部型号'
  },
  select: {
    'placeholder': {
      id: 'common.BaseUI.select.placeholder',
      defaultMessage: '请选择'
    },
    'modalTitle': {
      id: 'common.BaseUI.select.modalTitle',
      defaultMessage: '设置终端型号'
    },
    'selectTitle': {
      id: 'common.BaseUI.select.selectTitle',
      defaultMessage: '终端型号'
    },
  },
  form: {
    'uploadTip': {
      id: 'common.BaseUI.form.uploadTip',
      defaultMessage: '上传类型只支持：'
    },
    'uploadFailed': {
      id: 'common.BaseUI.form.uploadFailed',
      defaultMessage: ' 上传失败'
    },
  },
  BaseUI: {
    'file': {
      id: 'common.BaseUI.button.file',
      defaultMessage: '文件'
    },
    'upload': {
      id: 'common.BaseUI.button.upload',
      defaultMessage: '上传'
    },
    'okText': {
      id: 'common.BaseUI.button.okText',
      defaultMessage: '确定'
    },
    'cancelText': {
      id: 'common.BaseUI.button.cancelText',
      defaultMessage: '取消'
    },
    'modalTitle': {
      id: 'common.BaseUI.select.modalTitle',
      defaultMessage: '设置终端型号'
    },
  },
  search: {
    title: {
      id: 'common.SystemApplicationManagement.search.title',
      defaultMessage: '名称：'
    },
    tip: {
      id: 'common.SystemApplicationManagement.search.tip',
      defaultMessage: '按名称或包名模糊查询'
    }
  },
  searchSelect: {
    title: {
      id: 'common.searchSelect.title',
      defaultMessage: '终端型号'
    }
  },
});

export default messages;
