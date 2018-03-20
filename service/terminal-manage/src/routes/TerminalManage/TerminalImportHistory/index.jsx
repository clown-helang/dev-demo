import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import NavBar from '../../../components/DefaultUI/NavBar';
import TerminalImportHistoryTable from '../../../components/TerminalManage/TerminalImportHistoryTable/index';
import messages from './messages';
import styles from './index.less';

function TerminalImportHistory({ dispatch, terminal_import_history, loading, intl: { formatMessage } }){
  return (
    <div className={styles.wrap}>
      <NavBar title={formatMessage(messages.title)}/>
      <div style={{height:20}}/>
      <TerminalImportHistoryTable dispatch={dispatch} terminal_import_history={terminal_import_history} loading={loading}/>
    </div>
  )
}

TerminalImportHistory.propTypes = {
  dispatch: PropTypes.func,
  terminal_import: PropTypes.object
};

function mapStateToProps(state) {
  const { terminal_import_history }= state;
  return {
    terminal_import_history,
    loading: state.loading.models.terminal_import_history
  };
}

export default injectIntl(connect(mapStateToProps)(TerminalImportHistory));
