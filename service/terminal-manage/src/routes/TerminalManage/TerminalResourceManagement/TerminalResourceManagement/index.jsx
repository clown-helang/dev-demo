import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import { getLocalStorage } from '../../../../utils/index';
import NavBar from '../../../../components/DefaultUI/NavBar';
import SearchBar from '../../../../components/DefaultUI/SearchBar';
import TenantsList from '../../../../components/DefaultUI/TenantsList';
import TerminalTypeList from '../../../../components/DefaultUI/TerminalTypeList';
import TerminalResourceManagementTable from '../../../../components/TerminalManage/TerminalResourceManagement/TerminalResourceManagementTable/index';
import messages from './messages';

function TerminalResourceManagement({ dispatch, terminal_resource_management, loading, intl: { formatMessage } }){

  const permissions = getLocalStorage('permissionButtons');
  const batchImportPermission = permissions?permissions.filter(item => item === 'terminal_manage:terminal_resource_management:batchImport'):[];
  const debugPermission = permissions?permissions.filter(item => item === 'terminal_manage:terminal_resource_management:debug'):[];
  const deletePermission = permissions?permissions.filter(item => item === 'terminal_manage:terminal_resource_management:delete'):[];
  const assignedPermission = permissions?permissions.filter(item => item === 'terminal_manage:terminal_resource_management:assigned_tenants'):[];

  const batchImport = () => {
     dispatch({type: 'terminal_resource_management/process'});
  };
  const search = (value) => {
    const {filter_assigned_tenant_id,filter_device_model_id} = terminal_resource_management;
    dispatch({type:'terminal_resource_management/queryTerminalResourceList',payload:{device_model_id:filter_device_model_id,assigned_tenant_id:filter_assigned_tenant_id,serial_number:value} });
  };
  const firstOption = [{
    id: '0',
    name:formatMessage(messages.TerminalResourceManagement.select_placeholder),
  }];
  const handleSelectChange = (id) => {
    const {filter_assigned_tenant_id,search_value} = terminal_resource_management;
    dispatch({type:'terminal_resource_management/setFilter',payload:{filter_device_model_id:id} });
    dispatch({type:'terminal_resource_management/queryTerminalResourceList',payload:{device_model_id:id,assigned_tenant_id:filter_assigned_tenant_id,serial_number:search_value} });
  };
  const handleTenantsSelectChange = (id) => {
    const {search_value,filter_device_model_id} = terminal_resource_management;
    dispatch({type:'terminal_resource_management/setFilter',payload:{filter_assigned_tenant_id:id} });
    dispatch({type:'terminal_resource_management/queryTerminalResourceList',payload:{device_model_id:filter_device_model_id,assigned_tenant_id:id,serial_number:search_value} });
  };
  const tableProps = { dispatch, terminal_resource_management, loading, debugPermission, deletePermission, assignedPermission };
  return (
    <div>
      <NavBar title={formatMessage(messages.TerminalResourceManagement.terminal_resource)} />
      {
        batchImportPermission.length>0
        ? <Button type="primary" onClick={batchImport}>
            <FormattedMessage {...messages.TerminalResourceManagement.bulk_import} />
          </Button>
        : ''
      }
      <div className="search-bar">
        <div>
          {
            assignedPermission.length > 0
            ? <TenantsList title={formatMessage(messages.TerminalResourceManagement.distribution_tenant)} value={terminal_resource_management.filter_assigned_tenant_id}  firstOption={firstOption}  handleChange={handleTenantsSelectChange}/>
            : ''
          }
          <TerminalTypeList title={formatMessage(messages.TerminalResourceManagement.terminal_model)} value={terminal_resource_management.filter_device_model_id} firstOption={firstOption} handleChange={handleSelectChange}/>
          <SearchBar enterButton={true}  valueName='search_value' title={formatMessage(messages.TerminalResourceManagement.serial_number)} value={terminal_resource_management.search_value}  tip={formatMessage(messages.TerminalResourceManagement.serial_number)} search={search} modalName='terminal_resource_management/setFilter' dispatch={dispatch}/>
        </div>
      </div>
      <TerminalResourceManagementTable { ...tableProps }/>
    </div>
  )
}

TerminalResourceManagement.propTypes = {
  dispatch: PropTypes.func,
  terminal_resource_management: PropTypes.object
};

function mapStateToProps(state) {
  return {
    terminal_resource_management:state.terminal_resource_management,
    loading: state.loading.models.terminal_resource_management
  };
}

export default injectIntl(connect(mapStateToProps)(TerminalResourceManagement));
