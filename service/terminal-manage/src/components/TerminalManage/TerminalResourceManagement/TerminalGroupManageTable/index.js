import {injectIntl, FormattedMessage} from 'react-intl';
import TableUI from '../../../DefaultUI/TableUI';
import { routerRedux } from 'dva/router';
import moment from 'moment-timezone';
import messages from './messages';

function TerminalGroupManageTable({ dispatch, terminalGroupManage, loading, intl: { formatMessage } }){
  const columns = [
    {
      title: formatMessage(messages.groupName),
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: formatMessage(messages.createTime),
      dataIndex: 'create_time',
      key: 'create_time',
      sorter: true,
      render:(text,record,index ) =>{
        if(record.create_time) {
          return moment(record.create_time).format('YYYY-MM-DD HH:mm:ss');
        }
      }
    },
    {
      title: formatMessage(messages.operator),
      dataIndex: 'operation',
      key: 'operation',
      render:(text, record, index) => {
        return (
          <span className="table-btns">
            <a className="table-btns"
               onClick={() => terminalManage(record.id)}>{formatMessage(messages.terminalManage)}</a>
          </span>
        )
      }
    },
  ];
  const terminalManage = (group_id) =>{
    dispatch(routerRedux.push({pathname: '/terminal_manage/terminal_group_management/groupManageSetup', query: { group_id }}));
  };
  const rowKey = record => record.id;

  const pageFunction = {
    onChange(page, pageSize){
      dispatch({type: 'terminalGroupManage/queryTerminalResourceList', payload: {page_number:page,page_size:pageSize}});
    },
    onShowSizeChange(current, size){
      dispatch({type: 'terminalGroupManage/queryTerminalResourceList', payload: {page_number:current,page_size:size}});
    }
  };
  const tableOnChange = (pagination, filters, sorter) => {
    if(sorter.field==='device_model_type'){
      sorter.field='TERMINAL_DEVICE_TYPE'
    }
    dispatch({type: 'terminalGroupManage/queryTerminalResourceList', payload: {sort_property:sorter.field,sort_direction:sorter.order}});
  };

  const tableProps = {
    columns: columns,
    data: terminalGroupManage.data,
    page_size: terminalGroupManage.page_size,
    rowKey,
    tableOnChange,
    pageFunction,
    currentPageNumber: terminalGroupManage.page_number,
    loading,
    footerButtons: null };
  return (
    <div>
      <TableUI {...tableProps} />
    </div>
  );
}

export default injectIntl(TerminalGroupManageTable);
