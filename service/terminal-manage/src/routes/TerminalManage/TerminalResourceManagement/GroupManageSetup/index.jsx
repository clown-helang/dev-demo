import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button } from 'antd';
import { routerRedux } from 'dva/router';
import { injectIntl, FormattedMessage } from 'react-intl';
import { getLocalStorage } from '../../../../utils/index';
import NavBar from '../../../../components/DefaultUI/NavBar';
import SearchBar from '../../../../components/DefaultUI/SearchBar';
import TerminalTypeList from '../../../../components/DefaultUI/TerminalTypeList';
import GroupManageSetupTable from '../../../../components/TerminalManage/TerminalResourceManagement/GroupManageSetupTable';
import messages from './messages';

function GroupManageSetup({ dispatch, groupManageSetup, loading, intl: { formatMessage } }){
  const callback = () => {
    dispatch(routerRedux.push('/terminal_manage/terminal_group_management'))
  };
  const firstOption = [{
    id: '0',
    name:formatMessage(messages.placeholder),
  }];
  const handleSelectChange = (device_model_id) => {
    dispatch({type:'groupManageSetup/queryTerminalResourceList',payload:{ device_model_id } });
  };
  const search = (serial_number) => {
    dispatch({type:'groupManageSetup/queryTerminalResourceList', payload:{ serial_number } });
  };
  const tableProps = { dispatch, groupManageSetup, loading };
  return (
    <div>
      <NavBar title={formatMessage(messages.defaultGroup)} />
      <Button type="primary" onClick={callback}>{formatMessage(messages.callback)}</Button>
      <div className="search-bar">
        <div>
          <TerminalTypeList title={formatMessage(messages.deviceModel)} value={groupManageSetup.device_model_id} firstOption={firstOption} handleChange={handleSelectChange}/>
          <SearchBar enterButton={true} valueName='serial_number' title={formatMessage(messages.serialNumber)} value={groupManageSetup.serial_number}  tip={formatMessage(messages.serialNumber)} search={search} modalName='groupManageSetup/setDeviceModelId' dispatch={dispatch}/>
        </div>
      </div>
      <div style={{marginTop:30}}>
        <GroupManageSetupTable { ...tableProps }/>
      </div>
    </div>
  )
}

GroupManageSetup.propTypes = {
  dispatch: PropTypes.func,
  groupManageSetup: PropTypes.object
};

function mapStateToProps(state) {
  return {
    groupManageSetup:state.groupManageSetup,
    loading: state.loading.models.groupManageSetup
  };
}

export default injectIntl(connect(mapStateToProps)(GroupManageSetup));
