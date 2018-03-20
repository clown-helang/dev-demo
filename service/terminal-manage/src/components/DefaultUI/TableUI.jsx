import React from 'react';
import PropTypes from 'prop-types';
import { Table, Pagination } from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import messages from './messages';
import styles from './table.less';

/**
 * 表格
 */

function TableUI({rowSelection, columns, data, page_size, onExpand, expandedRowRender, rowKey, expandedRowKeys, footerButtons, tableOnChange, pageFunction, currentPageNumber, loading, size="default", intl:{formatMessage} }){
  const footer = () => {
    const showTotal = (total=data.total, range) => (formatMessage(messages.table.total) + ` ${total} ` + formatMessage(messages.table.result));
    return (
      <div className={styles.footer}>
        <div className={styles.btn_group}>
          {footerButtons}
        </div>
        <div className={styles.pagination}>
          <Pagination pageSize={page_size} current={currentPageNumber} total={data.total} showSizeChanger={true} pageSizeOptions={['10','50','100','500']} showQuickJumper={true} {...pageFunction} showTotal={showTotal} />
        </div>
      </div>
    );
  };
  if(expandedRowRender){
    return (
      <div className={styles.table}>
        <Table rowSelection={rowSelection} onExpand={onExpand} columns={columns} rowKey={rowKey} expandedRowKeys={expandedRowKeys} dataSource={data.contents} expandedRowRender={expandedRowRender} pagination={false} size={size} footer={pageFunction?footer:undefined} onChange={tableOnChange} loading={loading} bordered/>
      </div>
    );
  }else{
    return (
      <div className={styles.table}>
        <Table rowSelection={rowSelection} columns={columns} rowKey={rowKey} dataSource={data.contents} pagination={false} size={size} footer={pageFunction?footer:undefined} onChange={tableOnChange} loading={loading} bordered/>
      </div>
    );
  }

}

TableUI.propTypes = {
  rowSelection: PropTypes.object,
  columns: PropTypes.array
};

export default injectIntl(TableUI);
