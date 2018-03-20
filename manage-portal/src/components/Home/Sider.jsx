import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'dva/router';
import { Menu, Icon } from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import messages from './messages';
import styles from './sider.less';

function IndexSider({ dispatch,currentMenus,defaultSelectedKeys,defaultOpenKeys,intl:{formatMessage} }){
  const { SubMenu, Item } = Menu;
  return (
    <Menu mode="inline" defaultSelectedKeys={defaultSelectedKeys} defaultOpenKeys={defaultOpenKeys} className={styles.subMenu} >
      {
        currentMenus.map(({code,name,childMenus}) => (
          <SubMenu key={code} title={<span >{formatMessage(messages[code])}</span>}>
            {
              childMenus.map(({code,name}) => (
                <Item key={code}><Link to={code}>{formatMessage(messages[code])}</Link></Item>
              ))
            }
          </SubMenu>
        ))
      }
    </Menu>
  )
}

IndexSider.propTypes = {
  currentMenus: PropTypes.array
};

export default injectIntl(IndexSider);
