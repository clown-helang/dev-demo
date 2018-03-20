import {injectIntl, FormattedMessage} from 'react-intl';
import TableUI from '../../../DefaultUI/TableUI';
import { Switch, Icon } from 'antd'
import messages from './messages';

function GroupManageSetupTable({ dispatch, groupManageSetup, loading, intl: { formatMessage } }){
  const columns = [
    {
      title: formatMessage(messages.serialNumber),
      dataIndex: 'serial_number',
      key: 'serial_number',
      sorter: true,
    },
    {
      title: formatMessage(messages.terminalType),
      dataIndex: 'device_model_type',
      key: 'device_model_type',
      sorter: true,
    },
    {
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
      title: formatMessage(messages.testTerminal),
      dataIndex: 'environement_state',
      key: 'environement_state',
      render:(text, record, index) => {
        if(text === 'OFFLINE'){
          return (<Switch defaultChecked
                          checkedChildren={<Icon type="check"/>}
                          unCheckedChildren={<Icon type="cross"/>}
                          onChange = {()=>switchChange(text, record.id)}/>)
        }else{
          return (<Switch
            checkedChildren={<Icon type="check"/>}
            unCheckedChildren={<Icon type="cross"/>}
            onChange = {()=>switchChange(text, record.id)}/>)
        }
      }
    },
  ];
  const switchChange = (text, id) =>{
    console.log(text, id);

    dispatch({type:'groupManageSetup/setTerminalDeviceState',payload:{ id, state:text==='ONLINE' ? 'OFFLINE' : 'ONLINE' }});
  };
  const rowKey = record => record.id;

  const pageFunction = {
    onChange(page, pageSize){
      dispatch({type: 'groupManageSetup/queryTerminalResourceList', payload: {page_number:page,page_size:pageSize}});
    },
    onShowSizeChange(current, size){
      dispatch({type: 'groupManageSetup/queryTerminalResourceList', payload: {page_number:current,page_size:size}});
    }
  };
  const tableOnChange = (pagination, filters, sorter) => {
    dispatch({type: 'groupManageSetup/queryTerminalResourceList', payload: {sort_property:sorter.field,sort_direction:sorter.order}});
  };

  const tableProps = {
    columns: columns,
    data: groupManageSetup.data,
    page_size: groupManageSetup.page_size,
    rowKey,
    tableOnChange,
    pageFunction,
    currentPageNumber: groupManageSetup.page_number,
    loading,
    footerButtons: null };
  return (
    <div>
      <TableUI {...tableProps} />
    </div>
  );
}

export default injectIntl(GroupManageSetupTable);
