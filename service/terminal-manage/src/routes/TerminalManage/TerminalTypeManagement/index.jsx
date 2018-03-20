import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Layout, Menu, Icon, Button } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import NavBar from '../../../components/DefaultUI/NavBar';
import SearchBar from '../../../components/DefaultUI/SearchBar';
import TerminalTypeManagementTable from '../../../components/TerminalManage/TerminalTypeManagement/TerminalTypeManagementTable';
import messages from './messages';

function TerminalTypeManagement({ dispatch,terminal_type_management, loading, intl: { formatMessage } }){
  const search = (value) => {
    dispatch({type: 'terminal_type_management/setSearchValue', payload: {search_value:value}});
    dispatch({type: 'terminal_type_management/queryTerminalTypeList',payload:{search_value:value}})
  };
  const add = () => {
    dispatch({type: 'terminal_type_management/setType',payload:{type:'add'}});
    dispatch({type: 'terminal_type_management/setEditInfor',payload:{id:'',name:'',provider:'',device_type:''}});
    dispatch({type: 'terminal_type_management/getTerminalDeviceDictionary'});
    dispatch({type: 'terminal_type_management/setVisible',payload:{visible:true}})
  };
  return (
    <div>
      <NavBar title={formatMessage(messages.TerminalTypeManagement.terminal_type_title)} />
      <Button type="primary" onClick={add}>
        <FormattedMessage {...messages.button.add} />
      </Button>
      <div className="search-bar">
        <div>
          <SearchBar enterButton={true} valueName='search_value' value={terminal_type_management.search_value} title={formatMessage(messages.TerminalTypeManagement.name)} tip={formatMessage(messages.TerminalTypeManagement.name)} search={search}  modalName='terminal_type_management/setSearchValue' dispatch={dispatch}/>
        </div>
      </div>
      <TerminalTypeManagementTable dispatch={dispatch} terminal_type_management={terminal_type_management} loading={loading} />
    </div>
  )
}

TerminalTypeManagement.propTypes = {
  dispatch: PropTypes.func,
  terminal_type_management: PropTypes.object
};

function mapStateToProps(state) {
  return {
    terminal_type_management:state.terminal_type_management,
    loading: state.loading.models.terminal_type_management
  };
}

export default injectIntl(connect(mapStateToProps)(TerminalTypeManagement));
