import ReactDOM from 'react-dom';
import {addLocaleData, IntlProvider} from 'react-intl';
import IndexHeader from './components/Home/Header';
import { getLocalStorage } from './utils';
import { menus } from './utils/config';
import { LocaleProvider } from 'antd';
//国际化
import zhHeaderMessages from './i18n/zh-Hans-CN/header';
import enHeaderMessages from './i18n/en-US/header';

const appLocale = window.appLocale;
const user = getLocalStorage('user');
const headerMenus = getLocalStorage('headerMenus');
const headerButtons = getLocalStorage('headerButtons');
const activeHeadMenu = getLocalStorage('activeHeadMenu');
const filterMenus = menus.filter((menu)=>{
  return headerMenus.indexOf(menu.code)>=0;
});

if(appLocale.locale==='zh-Hans-CN'){
  appLocale.messages = {
    ...appLocale.messages,...zhHeaderMessages
  }
}
if(appLocale.locale==='en-US'){
  appLocale.messages = {
    ...appLocale.messages,...enHeaderMessages
  }
}

const headerProps = { user,menus:filterMenus };
addLocaleData(appLocale.data);
ReactDOM.render(
    <LocaleProvider locale={appLocale.antd}>
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <IndexHeader {...headerProps} />
      </IntlProvider>
    </LocaleProvider>,
    document.getElementById("header")
);
