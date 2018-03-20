import React from 'react';
import { Select, Button, Popover } from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import moment from 'moment-timezone';
import TableUI from '../../DefaultUI/TableUI';
import messages from './messages';

const Option = Select.Option;

function TerminalImportHistoryTable({ dispatch, terminal_import_history, loading, intl: { formatMessage } }) {
  const download = (id) => {
    dispatch({type: 'terminal_import_history/downloadRecords', payload: {id}});
  };

  const columns = [
    {
      title: formatMessage(messages.fileName),
      dataIndex: 'file_name',
      key: 'file_name',
    },
    {
      title: formatMessage(messages.importTime),
      dataIndex: 'create_time',
      key: 'create_time',
      sorter: true,
      render:(text, record, index) => {
        return moment(record.create_time).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    {
      title:  formatMessage(messages.importState),
      dataIndex: 'import_status',
      key: 'import_status',
      sorter: true,
      render:(text, record, index) => {
        return formatMessage(messages.state[text])
      },
    },
    {
      title: formatMessage(messages.successNumber),
      dataIndex: 'success_number',
      key: 'success_number',
    },
    {
      title: formatMessage(messages.failedNumber),
      dataIndex: 'failed_number',
      key: 'failed_number',
    },
    {
      title: formatMessage(messages.failedfiles),
      dataIndex: 'operation',
      key: 'operation',
      render:(text, record, index) => {
        if(record.import_status==='FAILED'){
          return (
            <span className="table-btns">
                <a className="table-btns" onClick={() => download(record.id)}>下载</a>
              </span>
          )
        }
        else{
          return(
            ''
          )
        }
      }
    }
  ];
  const rowKey = record => record.id;

  const pageFunction = {
    onChange(page, pageSize){
      dispatch({type: 'terminal_import_history/queryImportDevicesRecords', payload: {page_number:page,page_size:pageSize}});
    },
    onShowSizeChange(current, size){
      dispatch({type: 'terminal_import_history/queryImportDevicesRecords', payload: {page_number:current,page_size:size}});
    }
  };
  const tableOnChange = (pagination, filters, sorter) => {
    dispatch({type: 'terminal_import_history/queryImportDevicesRecords', payload: {sort_property:sorter.field,sort_direction:sorter.order}});
  };

  const tableProps = {
    columns,
    data:terminal_import_history.data,
    page_size:terminal_import_history.page_size,
    rowKey,
    tableOnChange,
    pageFunction,
    currenPageNumber:terminal_import_history.page_number,
    loading,
    };
  return (
    <TableUI {...tableProps} />
  );
}

export default injectIntl(TerminalImportHistoryTable);
