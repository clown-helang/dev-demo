import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Dropdown, Modal, Form  } from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import ChangeAccount from './ChangeAccount';
import ChangePasswd from './ChangePasswd';
import { queryUserById,editUser } from '../../services/editUser'
import { setLocalStorage,getLocalStorage } from '../../utils';
import messages from './messages';
import styles from './header.less';
const language_html = window.appLocale.language=='chi'?'':`index-${window.appLocale.language}.html`;

class IndexHeader extends Component{

  constructor(props){
    super(props);
    this.state = {
      visible:false,
      account_visible:false,
      edit_dto: {
        name:'',
        phone:'',
        mail:'',
      },
      user:'',
      loading:false,
    }
  }

  dropDownClick= ({ key }) => {
    const _this = this;
    const token = getLocalStorage('token');
    if(`${key}` === 'logout'){
      Modal.confirm({
          title: this.props.intl.formatMessage(messages.title),
          content: this.props.intl.formatMessage(messages.content),
          onOk: () => {
            localStorage.clear();
            location.href="/";
          }
      });
    }
    if(`${key}` === 'change_passwd'){
      _this.setState({
        visible:true
      })
    }
    if(`${key}` === 'editUser'){
      const payload={token};
      queryUserById({payload}).then((body) => {
        if(body){
          _this.setState({
            edit_dto: body,
            account_visible:true
          })
          setLocalStorage('user',body.name);
        }
      },(res) => {
        Modal.error({
          title: appLocale.messages["commom.Error.nologin.title"],
          content: appLocale.messages["commom.Error.nologin.content"],
          okText:appLocale.messages["common.BaseUI.button.okText"],
          onOk: () => {
            sessionStorage.clear();
            location.href="/";
          }
        });
      })
    }
  };

  menuClick = ({ key }) => {
    const headerMenus = getLocalStorage('headerMenus');
    if(headerMenus.filter(item=>item===key.split('/#/')[1]).length>0){
      setLocalStorage('activeHeadMenu',key);
      window.location.href=key;
    }else{
      Modal.warning({
        title: '您没有当前操作请求的权限！',
        onOk: () => {
          window.location.href='/';
        }
      });
    }
  };
  setLoadingState = (value) =>{
    this.setState({
      loading: value,
    })
  };
  setVisible = (visible) =>{
    this.setState({
      visible: visible,
    })
  };

  setAccountVisibleAndUser = (visible,user) =>{
    if(user!==undefined){
      this.setState({
        account_visible: visible,
        user:user
      })
    }else {
      this.setState({
        account_visible: visible
      })
    }
  };
  render() {
    const {visible,account_visible,edit_dto,loading} = this.state;
    const {menus,intl:{formatMessage}} = this.props;
    let activeHeadMenu = getLocalStorage('activeHeadMenu');
    let {user}=this.props;
    if(this.state.user!==''){
      user=this.state.user;
    }
    const dropdownMenu = (
      <Menu className={styles.dropMenu} onClick={this.dropDownClick}>
        <Menu.Item key="change_passwd">{formatMessage(messages['change_passwd'])}</Menu.Item>
        <Menu.Item key="editUser">{formatMessage(messages['editUser'])}</Menu.Item>
        <Menu.Item key="logout">{formatMessage(messages['logout'])}</Menu.Item>
      </Menu>
    );

    return (
      <Layout.Header className={styles.header}>
        <div className={styles.logo}><FormattedMessage {...messages.logoTitle}/></div>
        {
          menus.length>0
          ? <Menu selectedKeys={activeHeadMenu?[activeHeadMenu]:[`/${menus[0].service}/${language_html}#/${menus[0].code}`]} theme="dark" mode="horizontal" className={styles.headerMenu} onClick={this.menuClick}>
              {menus.map(item => {
                return <Menu.Item key={`/${item.service}/${language_html}#/${item.code}`}>{formatMessage(messages[item.code])}</Menu.Item>;
              })}
            </Menu>
          : ''
        }
        <div className={styles.userInfo}>
          <Dropdown overlay={dropdownMenu}>
            <div className={styles.dropLink}>
              <Icon type="user"/> { user.length>20 ? user.substr(0,20)+'...' : user } <Icon type="down"/>
            </div>
          </Dropdown>
        </div>
        <ChangePasswd visible={visible} setVisible={this.setVisible} setLoadingState={this.setLoadingState} loading={loading}/>
        <ChangeAccount account_visible={account_visible} edit_dto={edit_dto} setAccountVisibleAndUser={this.setAccountVisibleAndUser}  setLoadingState={this.setLoadingState} loading={loading}/>

      </Layout.Header>
    )
  }
}

IndexHeader.propTypes = {
  user: PropTypes.string,
  menus: PropTypes.array
};

export default injectIntl(Form.create()(IndexHeader));
