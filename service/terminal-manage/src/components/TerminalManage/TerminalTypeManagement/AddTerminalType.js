import React from 'react';
import { connect } from 'dva';
import { Button, Form,Input,Select, Icon,Modal} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import { get_length, cut_str, trim } from '../../../utils';
import messages from './messages';
const FormItem = Form.Item;
const Option = Select.Option;
const formHttpItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 12 }};

function AddTerminalType({dispatch,terminal_type_management,form: { validateFields, getFieldDecorator}, intl: { formatMessage }}) {
  const handleSubmit=(e)=>{
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        values.name = trim(values.name)
        if(terminal_type_management.type==='add'){
          dispatch({type: 'terminal_type_management/addTerminalType', payload: {postData:values}});
        }else{
          dispatch({type: 'terminal_type_management/editTerminalType', payload: {postData:values}});
        }
      }
    })
  };
  const handleCancel=()=>{
    dispatch({type: 'terminal_type_management/setVisible',payload:{visible:false}});
  };
  return (
    <Modal
      title={formatMessage(messages.button[terminal_type_management.type])+formatMessage(messages.TerminalTypeManagement.type)}
      visible={terminal_type_management.visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      {
        terminal_type_management.visible
          ? <Form layout='horizontal'>
            <FormItem {...formHttpItemLayout} label={formatMessage(messages.TerminalTypeManagement.name)}>
              {getFieldDecorator('name', {
                initialValue:terminal_type_management.name,
                rules:[{
                  required:true,
                  message: formatMessage(messages.TerminalTypeManagement.name)+formatMessage(messages.NotNull)
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

            <FormItem {...formHttpItemLayout} label={formatMessage(messages.TerminalTypeManagement.provider)}>
              {getFieldDecorator('provider',{
                initialValue:terminal_type_management.provider,
                rules: [
                  {
                    required: true, message: formatMessage(messages.TerminalTypeManagement.provider)+formatMessage(messages.NotNull)
                  }
                ]
              })(
                <Select placeholder={formatMessage(messages.placeholder)} disabled={terminal_type_management.type==='edit'}>
                  {
                    terminal_type_management.terminalDeviceProviderList.map((item, index) => {
                      return <Option value={item.code} key = {index}>{item.code}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>

            <FormItem {...formHttpItemLayout} label={formatMessage(messages.TerminalTypeManagement.device_type)}>
              {getFieldDecorator('device_type',{
                initialValue:terminal_type_management.device_type,
                rules: [
                  {
                    required: true, message: formatMessage(messages.TerminalTypeManagement.device_type)+formatMessage(messages.NotNull)
                  }
                ]
              })(
                <Select placeholder={formatMessage(messages.placeholder)} disabled={terminal_type_management.type==='edit'}>
                  {
                    terminal_type_management.terminalDeviceTypeList.map((item, index) => {
                      return <Option value={item.code} key = {index}>{item.code}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>

          </Form>
          :''
      }
    </Modal>
  )
}

export default injectIntl(Form.create()(AddTerminalType));
