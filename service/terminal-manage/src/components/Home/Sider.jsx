import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'dva/router';
import { Menu, Icon } from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import messages from './messages';
import styles from './sider.less';

function IndexSider({ dispatch, activeMenu, childMenus, siderMenus, openKeys, selectedKeys, intl:{formatMessage} }){
  const {SubMenu, Item} = Menu;
  const openChange = (keys) => {
    dispatch({type: 'home/openMenu', payload: {openKeys:keys}});
  };

  const SubMenus = (code,child) => {
    let isSubMenu = false;
    let SubMenuList = new Array();
    child.map(({code}) => {
      if(siderMenus.indexOf(code)>=0){
        isSubMenu = true;
        SubMenuList.push(<Item key={code}><Link to={`/${activeMenu}/${code}`}>{formatMessage(messages[code])}</Link></Item>);
      }
    });

    if(isSubMenu){
      return (
        <SubMenu key={code} title={<span >{formatMessage(messages[code])}</span>}>
          {SubMenuList}
        </SubMenu>
      );
    }
  };

  return (
    <Menu mode="inline" openKeys={openKeys} selectedKeys={selectedKeys} className={styles.subMenu} onOpenChange={openChange}>
      {
        childMenus.map(({code,child}) => (SubMenus(code,child)))
      }
    </Menu>
  )
}

IndexSider.propTypes = {
  activeMenu: PropTypes.string,
  childMenus: PropTypes.array,
  siderMenus: PropTypes.array,
  openKeys: PropTypes.array,
  selectedKeys: PropTypes.array,
};

export default injectIntl(IndexSider);
