import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Form, Icon, Input,Row,Col} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import { routerRedux } from 'dva/router';
import styles from './BatchImportForm.less';
import UploadFile from '../../../DefaultUI/UploadXLS';
import DeviceSelect from './DeviceSelect';
import TenantsList from '../../../DefaultUI/TenantsList';
import messages from './messages';
import { get_length, cut_str } from '../../../../utils';
const FormItem = Form.Item;
const { TextArea } = Input;

const formHttpItemLayout = { labelCol: { span: 12 }, wrapperCol: { span: 8 }};
function BatchImportForm({ dispatch ,batchImport, form: { validateFields, getFieldDecorator}, intl: { formatMessage } }){
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        if(values.tenant_id==='0'){
          values.tenant_id='';
        }
        dispatch({type: 'batchImport/importTerminalDevices', payload: {postData:values}});
      }
    });
  };
  const firstOption = [{
    id: '0',
    name:formatMessage(messages.TerminalResourceManagement.select_placeholder),
  }];
  const handleTenantsSelectChange = (id) => {
    dispatch({type:'batchImport/setAssignedTenantId',payload:{tenant_id:id} });
  };
  return(
    <div className={styles.formPage}>
      <div style={{paddingTop:30, width:'100%'}}>
        <Form layout='horizontal'>
          <FormItem
            {...formHttpItemLayout}
            label={formatMessage(messages.TerminalResourceManagement.distribution_tenant)}
          >
            {getFieldDecorator('tenant_id', {
              initialValue:batchImport.tenant_id,
            })(
              <TenantsList firstOption={firstOption} handleChange={handleTenantsSelectChange}/>
            )}
          </FormItem>

          <FormItem
            {...formHttpItemLayout}
            label={formatMessage(messages.batchImport.deviceModel)}
          >
            {getFieldDecorator('device_model_id', {
              initialValue:batchImport.device_model_id,
              rules: [{
                required: true,
                message: formatMessage(messages.batchImport.deviceModelTip),
              }],
              normalize:(value, prevValue) => {
                const max_length = 50;
                if(get_length(value)>=max_length){
                  return cut_str(value,max_length);
                }
                return value;
              }
            })(
              <DeviceSelect />
            )}
          </FormItem>

          <FormItem
            {...formHttpItemLayout}
            label={formatMessage(messages.batchImport.hardwareVersion)}
          >
            {getFieldDecorator('hardware_version', {
              initialValue:batchImport.hardware_version,
              rules: [{
                required: true,
                message: formatMessage(messages.batchImport.hardwareVersionTip),
              }],
              normalize:(value, prevValue) => {
                const max_length = 50;
                if(get_length(value)>=max_length){
                  return cut_str(value,max_length);
                }
                return value;
              }
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formHttpItemLayout}
            label={formatMessage(messages.batchImport.versionCode)}
          >
            {getFieldDecorator('version_code', {
              initialValue:batchImport.version_code,
              rules: [{
                required: true,
                message: formatMessage(messages.batchImport.versionCodeTip),
              }],
              normalize:(value, prevValue) => {
                const max_length = 50;
                if(get_length(value)>=max_length){
                  return cut_str(value,max_length);
                }
                return value;
              }
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formHttpItemLayout}
            label={formatMessage(messages.batchImport.file)}
          >
            {getFieldDecorator('file_path', {
              initialValue:batchImport.file_path,
              rules: [
                {
                  required: true,
                  message: formatMessage(messages.batchImport.fileTip)
                }
              ]
            })(<UploadFile />)}
          </FormItem>
        </Form>
      </div>
      <div>
       <Row>
         <Col span={2} offset={12}>
           <Button type="primary" onClick={handleSubmit}><FormattedMessage {...messages.button.okText} /></Button>
         </Col>
         <Col span={2}>
           <Button onClick={() => {dispatch(routerRedux.push('/terminal_manage/terminal_resource_management'))}}><FormattedMessage {...messages.button.cancelText} /></Button>
         </Col>
       </Row>
      </div>
    </div>
  )
}

BatchImportForm.propTypes = {
};
function mapStateToProps(state) {
  return {
    batchImport:state.batchImport,
    loading: state.loading.models.batchImport
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(BatchImportForm)));

