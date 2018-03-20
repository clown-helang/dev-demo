import { Select, Button, Modal  } from 'antd';
import debounce from 'lodash.debounce';
import {injectIntl, FormattedMessage} from 'react-intl';
import TableUI from '../../../DefaultUI/TableUI';
import AssignedTenants from '../AssignedTenants/index';
import moment from 'moment-timezone';
import messages from './messages';
const confirm = Modal.confirm;
const baseZone = window.baseConfig.baseZone;

const Option = Select.Option;

function TerminalResourceManagementTable({ dispatch, terminal_resource_management, loading, debugPermission, deletePermission, assignedPermission, intl: { formatMessage } }){
  const edit = (id) => {
    console.log('edit:'+id);
  };
  const del = () => {
    confirm({
      title: window.appLocale.messages['error'],
      content: formatMessage(messages.delete_confirmation),
      onOk() {
        dispatch({type:'terminal_resource_management/deleteTerminalDevicesByIds'})
      },
    });
  };
  const showModal = () => {
    let { contents } = terminal_resource_management.data;
    let { selectedRows } = terminal_resource_management;
    let selectedRowsLength = selectedRows.length;
    let _flag=false;
    for(let i in selectedRows){
      if(!_flag){
        for(let j in contents){
          if(contents[j].id===selectedRows[i]){
            if(contents[j].assigned_tenant_id&&contents[j].assigned_tenant_id!==null){
              _flag=true;
              break;
            }
          }
        }
      }else break;
    }
    if(_flag){
      confirm({
        title: window.appLocale.messages['error'],
        content: <div><p>{
          selectedRowsLength>1
            ? formatMessage(messages.confirmation_warning1)
            : formatMessage(messages.confirmation_warning3)
        }</p><p>{formatMessage(messages.confirmation_warning2)}</p></div>,
        onOk() {
          dispatch({type:'terminal_resource_management/setVisible',payload:{visible:true}})
        },
      });
    }else{
      dispatch({type:'terminal_resource_management/setVisible',payload:{visible:true}})
    }
  };
  const columns = [
    {
      title: formatMessage(messages.serial_number),
      dataIndex: 'serial_number',
      key: 'serial_number',
      sorter: true,
    },
    {
      title: formatMessage(messages.distribution_tenant),
      dataIndex: 'assigned_tenant_name',
      key: 'assigned_tenant_name',
    },
    {
      title:  formatMessage(messages.terminal_type),
      dataIndex: 'device_model_type',
      key: 'device_model_type',
      sorter: true,
    }, {
      title: formatMessage(messages.manufacturer),
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: formatMessage(messages.terminal_model),
      dataIndex: 'device_model_name',
      key: 'device_model_name',
    },
    {
      title: formatMessage(messages.mirror_version),
      dataIndex: 'version_code',
      key: 'version_code',
    },
    {
      title: formatMessage(messages.launcher_version),
      dataIndex: 'launcher_version',
      key: 'launcher_version',
      render:(text,record,index ) =>{
        if(record.ExtensionInformation) {
          return record.ExtensionInformation.luncher_version;
        }else{
          return ''
        }
      }
    },
    {
      title: formatMessage(messages.statusAndIP),
      dataIndex: 'statusAndIP',
      key: 'statusAndIP',
      render:(text, record, index) => {
        if(record.ExtensionInformation){
          return (
            <span className="table-btns">
              {
                record.ExtensionInformation.device_status==='on_line'
                ? <span>
                    <p>{formatMessage(messages.on_line)}</p>
                    <p>{record.ExtensionInformation.ip_address}</p>
                  </span>
                : <span>{formatMessage(messages.off_line)}</span>
              }
          </span>
          )
        }else{
          return(
            <span>{formatMessage(messages.off_line)}</span>
          )
        }
      }
    },
    {
      title: formatMessage(messages.active_time),
      dataIndex: 'active_time',
      key: 'active_time',
      render:(text,record,index ) =>{
        if(baseZone){
          const offSet = moment(Date.now()).utcOffset()*2 - baseZone*60;
          if(record.ExtensionInformation) {
            return moment(record.ExtensionInformation.active_time).utcOffset(offSet).format('YYYY-MM-DD HH:mm:ss');
          }
        } else {
          if(record.ExtensionInformation) {
            return moment(record.ExtensionInformation.active_time).format('YYYY-MM-DD HH:mm:ss');
          }
        }
      }
    },
    {
      title: formatMessage(messages.operation),
      dataIndex: 'operation',
      key: 'operation',
      render:(text, record, index) => {
        return (
          <span className="table-btns">
            <a className="table-btns"
               onClick={() => debug(record.id,'DEBUG_OPEN')}>{formatMessage(messages.debug_open)}</a>
            <a className="table-btns"
               onClick={() => debug(record.id,'DEBUG_CLOSE')}>{formatMessage(messages.debug_close)}</a>
          </span>
        )
      }
    },
  ];
  const columnsForTenants = [
    {
      title: formatMessage(messages.serial_number),
      dataIndex: 'serial_number',
      key: 'serial_number',
      sorter: true,
    },
    {
      title:  formatMessage(messages.terminal_type),
      dataIndex: 'device_model_type',
      key: 'device_model_type',
      sorter: true,
    }, {
      title: formatMessage(messages.manufacturer),
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: formatMessage(messages.terminal_model),
      dataIndex: 'device_model_name',
      key: 'device_model_name',
    },
    {
      title: formatMessage(messages.mirror_version),
      dataIndex: 'version_code',
      key: 'version_code',
    },
    {
      title: formatMessage(messages.launcher_version),
      dataIndex: 'launcher_version',
      key: 'launcher_version',
      render:(text,record,index ) =>{
        if(record.ExtensionInformation) {
          return record.ExtensionInformation.luncher_version;
        }else{
          return ''
        }
      }
    },
    {
      title: formatMessage(messages.statusAndIP),
      dataIndex: 'statusAndIP',
      key: 'statusAndIP',
      render:(text, record, index) => {
        if(record.ExtensionInformation){
          return (
            <span className="table-btns">
              {
                record.ExtensionInformation.device_status==='on_line'
                  ? <span>
                    <p>{formatMessage(messages.on_line)}</p>
                    <p>{record.ExtensionInformation.ip_address}</p>
                  </span>
                  : <span>{formatMessage(messages.off_line)}</span>
              }
          </span>
          )
        }else{
          return(
            <span>{formatMessage(messages.off_line)}</span>
          )
        }
      }
    },
    {
      title: formatMessage(messages.active_time),
      dataIndex: 'active_time',
      key: 'active_time',
      render:(text,record,index ) =>{
        if(baseZone){
          const offSet = moment(Date.now()).utcOffset()*2 - baseZone*60;
          if(record.ExtensionInformation) {
            return moment(record.ExtensionInformation.active_time).utcOffset(offSet).format('YYYY-MM-DD HH:mm:ss');
          }
        }else {
          if(record.ExtensionInformation) {
            return moment(record.ExtensionInformation.active_time).format('YYYY-MM-DD HH:mm:ss');
          }
        }
      }
    },
  ];
  const debug = (id,command) =>{
    dispatch({type:'terminal_resource_management/debug',payload:{ id,command }});
  };
  const rowKey = record => record.id;
  const rowSelection = {
    selectedRowKeys:terminal_resource_management.selectedRows,
    onChange: (selectedRowKeys, selectedRows) => {
      let selectedIds = [];
      selectedRows.map(({id})=>{
        selectedIds.push(id);
      });
      dispatch({type: 'terminal_resource_management/setSelectedRows', payload: {selectedRows:selectedIds}});
    }
  };
  const pageFunction = {
    onChange(page, pageSize){
      dispatch({type: 'terminal_resource_management/queryTerminalResourceList', payload: {page_number:page,page_size:pageSize}});
    },
    onShowSizeChange(current, size){
      dispatch({type: 'terminal_resource_management/queryTerminalResourceList', payload: {page_number:current,page_size:size}});
    }
  };
  const tableOnChange = (pagination, filters, sorter) => {
    if(sorter.field==='device_model_type'){
      sorter.field='TERMINAL_DEVICE_TYPE'
    }
    dispatch({type: 'terminal_resource_management/queryTerminalResourceList', payload: {sort_property:sorter.field,sort_direction:sorter.order}});
  };
  const footerButtons = (
    <div>
      <Button type="primary" style={{marginRight:20}} onClick={del} disabled={terminal_resource_management.selectedRows.length===0}><FormattedMessage {...messages.button.delete} /></Button>
      <Button type="primary" onClick={showModal}  disabled={terminal_resource_management.selectedRows.length===0}><FormattedMessage {...messages.distribution_tenant} /></Button>
    </div>
  );

  const tableProps = {
    columns: debugPermission.length>0?columns:columnsForTenants,
    data: terminal_resource_management.data,
    page_size: terminal_resource_management.page_size,
    rowKey,
    rowSelection: assignedPermission.length>0 || deletePermission.length>0 ? rowSelection : null,
    tableOnChange,
    pageFunction,
    currentPageNumber: terminal_resource_management.page_number,
    loading,
    footerButtons: deletePermission.length>0 ? footerButtons: null };
  return (
    <div>
      <TableUI {...tableProps} />
      <AssignedTenants dispatch={dispatch} terminal_resource_management={terminal_resource_management}/>
    </div>
  );
}

export default injectIntl(TerminalResourceManagementTable);
