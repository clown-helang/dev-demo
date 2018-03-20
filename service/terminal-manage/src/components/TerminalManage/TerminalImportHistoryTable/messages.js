import {defineMessages} from 'react-intl';

const messgaes = defineMessages({
  button:{
    delete:{
      id:"common.BaseUI.button.delete",
      defaultMessage:"删除",
    }
  },
  state:{
    SUCCESS:{
      id:'SUCCESS',
      defaultMessage:'成功',
    },
    FAILED:{
      id:'FAILED',
      defaultMessage:'失败',
    },
    ERROR:{
      id:'ERROR',
      defaultMessage:'异常',
    },
    PROCESSING:{
      id:'PROCESSING',
      defaultMessage:'处理中',
    },
  },
  fileName:{
    id:'common.TerminalImportHistoryQuery.fileName',
    defaultMessage:'导入文件名称',
  },
  importTime:{
    id:'common.TerminalImportHistoryQuery.importTime',
    defaultMessage:'导入时间',
  },
  importState:{
    id:'common.TerminalImportHistoryQuery.importState',
    defaultMessage:'状态',
  },
  successNumber:{
    id:'common.TerminalImportHistoryQuery.successNumber',
    defaultMessage:'成功数量',
  },
  failedNumber:{
    id:'common.TerminalImportHistoryQuery.failedNumber',
    defaultMessage:'失败数量',
  },
  failedfiles:{
    id:'common.TerminalImportHistoryQuery.failedfiles',
    defaultMessage:'失败文件',
  },

});

export default messgaes;
