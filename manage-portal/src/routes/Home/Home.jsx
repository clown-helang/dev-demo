import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {Layout, Menu, Icon} from 'antd';
import IndexHeader from '../../components/Home/Header';
import { menus,buttons } from '../../utils/config';
import { FormattedMessage } from 'react-intl';
import { getSession } from '../../utils';
import messages from './messages';
import styles from './home.less';

function Home({children, dispatch,home:{headerMenus,headerButtons, user, defaultSelectedKeys, defaultOpenKeys}}){
  const {SubMenu} = Menu;
  const {Header, Content, Footer, Sider} = Layout;
  const filterMenus = menus.filter((menu)=>{
    return headerMenus.indexOf(menu.code)>=0;
  });
  const setUser = (user) => {
    dispatch({type:'home/setUser',payload:{user}})
  };
  const headerProps = { user,menus:filterMenus };
  return (
    <Layout className={styles.main}>
      <IndexHeader {...headerProps} />
      <Layout>
        <Content className={styles.content}>
          {children||(
            <div className={styles.welcome}>
              <FormattedMessage {...messages.welcometitle}/>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  )
}

Home.propTypes = {
  dispatch: PropTypes.func,
  home: PropTypes.object
};

function mapStateToProps({ home }) {
  return { home };
}

export default connect(mapStateToProps)(Home);
