import React,{Component} from 'react';
import { connect } from 'dva'
import { injectIntl } from 'react-intl';
import NavBar from '../../../../components/DefaultUI/NavBar';
import BatchImportForm from '../../../../components/TerminalManage/TerminalResourceManagement/BatchImport/BatchImportForm';
import messages from './messages';

function BatchImport({ intl: { formatMessage } }) {

  return (
    <div>
      <NavBar title={formatMessage(messages.title)}/>
      <BatchImportForm />
    </div>
  )
}
export default injectIntl(connect()(BatchImport));
