import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {Layout, Menu, Icon} from 'antd';
import IndexSider from '../../components/Home/Sider';
import styles from './Home.less';

function Home({children, dispatch,home}){
    const {SubMenu} = Menu;
    const {Header, Content, Footer, Sider} = Layout;
    const siderProps = { dispatch, ...home  };
    return (
      <Layout className={styles.main}>
        <Layout>
          <Sider width={250} className={styles.sider}>
            <IndexSider {...siderProps} />
          </Sider>
          <Content className={styles.content}>
            {children}
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
