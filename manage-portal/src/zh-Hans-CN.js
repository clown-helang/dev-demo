import appLocaleData from 'react-intl/locale-data/zh';
import zhMessages from './i18n/zh-Hans-CN.messages';
import zhCN from './i18n/zh_CN/zh_CN';

//noinspection JSAnnotator
window.appLocale = {
  messages: {
    ...zhMessages,
  },
  antd: zhCN,
  locale: 'zh-Hans-CN',
  data: appLocaleData,
  language: 'chi'
};
