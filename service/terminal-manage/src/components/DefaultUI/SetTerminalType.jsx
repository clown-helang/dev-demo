import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Select, Modal, Form } from 'antd';
import { connect } from 'dva'
import {injectIntl, FormattedMessage} from 'react-intl';
import { getLocalStorage } from '../../utils';
import { queryDeviceModels } from '../../services/DifferentialPacketManagement';
import styles from './SetTerminalType.less';
import messages from './messages';
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = { labelCol: {span: 6 }, wrapperCol: { span: 15 }};

/**
 * 多选框
 */
class SetTerminalType extends Component {
  constructor(props){
    super(props);
    this.state = {
      options: [],
      visible:false
    }
  }
  OKModal = () => {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!errors) {
        let valuesLen=values.terminalSelect?values.terminalSelect.length:0;
        if(valuesLen>0){
          this.props.dispatch({type: this.props.modelFun, payload: {id:this.props.id,device_model_ids:values.terminalSelect}});
        }else{
          Modal.info({
            title: '提示',
            content:'没有选择终端型号！',
          });
        }
      }
    });
    this.setState({
      visible: false,
    });
    this.props.form.resetFields();
  }
  cancelModal = () => {
    this.setState({
      visible: false,
    });
    this.props.form.resetFields();
  }
  showModal = () =>{
    this.getDeviceModels();
    this.setState({
      visible: true,
    });
  }
  getDeviceModels = () => {
    const _this = this;
    const token = getLocalStorage('token');
    const payload = {
      token,
      page_size:10,
      page_number:1,
      sort_property:'CREATE_TIME',
      sort_direction:'DESC',
    };
    queryDeviceModels({payload}).then((body) => {
      if(body.datas){
        _this.setState({
          options: body.datas
        })
      }else{
        if(body.datas){
          _this.setState({
            options: []
          })
        }
      }
    })
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.teminalModal}>
        <span className="table-btns">
          <a className="table-btns" onClick={this.showModal}><FormattedMessage {...messages.BaseUI.modalTitle} /></a>
        </span>
        <Modal
          title={this.props.intl.formatMessage(messages.BaseUI.modalTitle)}
          visible={this.state.visible}
          onOk={this.OKModal}
          onCancel={this.cancelModal}
          okText={this.props.intl.formatMessage(messages.BaseUI.okText)}
          cancelText={this.props.intl.formatMessage(messages.BaseUI.cancelText)}
        >
          <div className={styles.teminalModalBox}>
            <Form layout='horizontal'>
              <FormItem
                {...formItemLayout}
                label={this.props.intl.formatMessage(messages.select.selectTitle)}
              >
                {getFieldDecorator('terminalSelect', {
                  initialValue:[]
                })(
                  <Select
                    mode="multiple"
                    size='default'
                    placeholder={this.props.intl.formatMessage(messages.select.placeholder)}
                    style={{ width: '100%'}}
                    dropdownClassName={styles.dropdown}
                  >
                    {this.state.options.length>0?this.state.options.map((item,index) => {
                      let option = item.device_type+' : '+item.provider+' : '+item.name;
                      return(
                        <Option value={item.id.toString()} key={index} title={option}>
                          {
                            option
                          }
                        </Option>
                      )
                    }):null}
                  </Select>
                )}
              </FormItem>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default injectIntl(Form.create()(connect()(SetTerminalType)));
