import 'babel-polyfill';
import dva from 'dva';
import './index.less';
import {browserHistory} from 'dva/router';
import {LocaleProvider,Modal} from 'antd';
import {addLocaleData, IntlProvider} from 'react-intl';
import createLoading from 'dva-loading';
import ReactDOM from 'react-dom';

const appLocale = window.appLocale;

// 1. Initialize
const app = dva({
  // history: browserHistory,
  onError (error) {
    console.log(error);
    if(error instanceof TypeError || error.message=='401'){
      Modal.warning({
        title: appLocale.messages["commom.Error.nologin.title"],
        content: appLocale.messages["commom.Error.nologin.content"],
        okText:appLocale.messages["common.BaseUI.button.okText"],
        onOk: () => {
          localStorage.clear();
          location.href="/";
        }
      });
    } else{
      const errorResult = appLocale.messages[error.message];
      if(errorResult === 'noPermissions'){
        Modal.warning({
          title:appLocale.messages.error,
          content:errorResult?errorResult:error.message,
          onOk: () => {
            location.href="/";
          }
        });
      } else{
        Modal.warning({title:appLocale.messages.error,content:errorResult?errorResult:error.message});
      }
    }
  },
});

// 2. Plugins
app.use(createLoading({ effects: true }));

// 3. Model
app.model(require('./models/Home/Home'));

// 4. Router
app.router(require('./router/router'));

// 5. Start
const App = app.start();

//set language
addLocaleData(appLocale.data);
//il8n
ReactDOM.render(
    <LocaleProvider locale={appLocale.antd}>
        <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
            <App/>
        </IntlProvider>
    </LocaleProvider>,
    document.getElementById("root")
);
