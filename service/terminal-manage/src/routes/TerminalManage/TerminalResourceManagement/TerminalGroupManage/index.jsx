import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import { getLocalStorage } from '../../../../utils/index';
import NavBar from '../../../../components/DefaultUI/NavBar';
import SearchBar from '../../../../components/DefaultUI/SearchBar';
import TerminalGroupManageTable from '../../../../components/TerminalManage/TerminalResourceManagement/TerminalGroupManageTable';
import messages from './messages';

function TerminalGroupManage({ dispatch, terminalGroupManage, loading, intl: { formatMessage } }){

  const search = (name) => {
    dispatch({type:'terminalGroupManage/queryTerminalGroup',payload:{name} });
  };

  const tableProps = { dispatch, terminalGroupManage, loading };
  return (
    <div>
      <NavBar title={formatMessage(messages.terminalGroupManagement)} />
      <div className="search-bar">
        <div>
          <SearchBar enterButton={true} valueName='name' title={formatMessage(messages.groupName)} value={terminalGroupManage.name}  tip={formatMessage(messages.groupName)} search={search} modalName='terminalGroupManage/setName' dispatch={dispatch}/>
        </div>
      </div>
      <TerminalGroupManageTable { ...tableProps }/>
    </div>
  )
}

TerminalGroupManage.propTypes = {
  dispatch: PropTypes.func,
  terminalGroupManage: PropTypes.object
};

function mapStateToProps(state) {
  return {
    terminalGroupManage:state.terminalGroupManage,
    loading: state.loading.models.terminalGroupManage
  };
}

export default injectIntl(connect(mapStateToProps)(TerminalGroupManage));
