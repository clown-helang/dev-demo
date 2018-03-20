import React from 'react';
import { connect } from 'dva';
import { Button, Form, Icon,Modal} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import { routerRedux } from 'dva/router';
import TenantsList from '../../../DefaultUI/TenantsList';
import messages from './messages';
const FormItem = Form.Item;

const formHttpItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 12 }};
function AssignedTenants({ dispatch ,terminal_resource_management, form: { setFieldsValue,setFields,validateFields, getFieldDecorator}, intl: { formatMessage } }){
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      let _flag=true;
      if(values.tenant_id==='0'){
        setFields({
          'tenant_id': {
            value: values.tenant_id,
            errors: [new Error(formatMessage(messages.distribution_tenant_NotNull))],
          }
        });
        _flag=false;
      }
      if(_flag){
        const postData={tenant_id:values.tenant_id,terminal_device_ids:terminal_resource_management.selectedRows};
        if (!err) {
          if(values.tenant_id==='0'){
            values.tenant_id=''
          }
          dispatch({type: 'terminal_resource_management/assignedTenants', payload: {postData}});
        }
      }
    });
  };
  const handleCancel = (e) => {
    dispatch({type:'terminal_resource_management/setAssignedTenantId',payload:{assigned_tenant_id:'0'}})
    dispatch({type:'terminal_resource_management/setVisible',payload:{visible:false}})
  };
  const firstOption = [{
    id: '0',
    name:formatMessage(messages.placeholder),
  }];
  const handleTenantsSelectChange = (id) => {
    if(id!==0){
      setFieldsValue({
        'tenant_id':id,
      })
    }
    dispatch({type:'terminal_resource_management/setAssignedTenantId',payload:{assigned_tenant_id:id} });
  };
  return(
    <Modal
      title={formatMessage(messages.distribution_tenant)}
      visible={terminal_resource_management.visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      {terminal_resource_management.visible
        ? <Form layout='horizontal'>
          <FormItem {...formHttpItemLayout} label={formatMessage(messages.distribution_tenant)} required={true}>
            {getFieldDecorator('tenant_id', {
              initialValue:terminal_resource_management.assigned_tenant_id,
            })(
              <TenantsList firstOption={firstOption} handleChange={handleTenantsSelectChange}/>
            )}
          </FormItem>
        </Form>
        : ''}

    </Modal>
  )
}

export default injectIntl(Form.create()(AssignedTenants));

