import { Select, Button, Modal  } from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import TableUI from '../../DefaultUI/TableUI';
import moment from 'moment-timezone';
import AddTerminalType from './AddTerminalType'
import messages from './messages';
const confirm = Modal.confirm;

const Option = Select.Option;

function TerminalTypeManagementTable({ dispatch, terminal_type_management, loading, intl: { formatMessage } }){
  const edit = (id) => {
    dispatch({type: 'terminal_type_management/getTerminalDeviceDictionary'});
    dispatch({type:'terminal_type_management/queryTerminalTypeById',payload:{id}});
  };
  const columns = [
    {
      title: formatMessage(messages.TerminalTypeManagement.name),
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: formatMessage(messages.TerminalTypeManagement.provider),
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title:  formatMessage(messages.TerminalTypeManagement.device_type),
      dataIndex: 'device_type',
      key: 'device_type',
      sorter: true,
    }, {
      title: formatMessage(messages.TerminalTypeManagement.create_time),
      dataIndex: 'create_time',
      key: 'create_time',
      sorter: true,
      render:(text,record,index ) =>{
        return moment(record.create_time).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    {
      title: formatMessage(messages.TerminalTypeManagement.operation),
      dataIndex: 'operation',
      key: 'operation',
      render:(text,record,index ) =>{
        return (
          <a className="table-btns" onClick={() => edit(record.id)}>{formatMessage(messages.button.edit)}</a>
        )
      }
    },
  ];
  const rowKey = record => record.id;

  const pageFunction = {
    onChange(page, pageSize){
      dispatch({type: 'terminal_type_management/queryTerminalTypeList', payload: {page_number:page,page_size:pageSize}});
    },
    onShowSizeChange(current, size){
      dispatch({type: 'terminal_type_management/queryTerminalTypeList', payload: {page_number:current,page_size:size}});
    }
  };
  const tableOnChange = (pagination, filters, sorter) => {
    dispatch({type: 'terminal_type_management/queryTerminalTypeList', payload: {sort_property:sorter.field,sort_direction:sorter.order}});
  };

  const tableProps = { columns, data:terminal_type_management.data, page_size:terminal_type_management.page_size,  rowKey, tableOnChange, pageFunction, currenPageNumber:terminal_type_management.page_number, loading, footerButtons:null };
  return (
    <div>
      <TableUI {...tableProps} />
      <AddTerminalType dispatch={dispatch} terminal_type_management={terminal_type_management}/>
    </div>
  );
}

export default injectIntl(TerminalTypeManagementTable);
