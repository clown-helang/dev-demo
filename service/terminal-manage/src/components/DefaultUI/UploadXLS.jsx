import React,{Component} from 'react';
import {Upload, message, Button, Icon} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import {getLocalStorage} from '../../utils';
import {baseURL} from '../../utils/config';
import api from '../../utils/api';
import messages from './messages';

let uuid = 0;
class UploadXLS extends Component{
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    }
  }
  beforeUpload = (file) => {
    const isXLS = file.name.endsWith('.xlsx')||file.name.endsWith('.xls');
    if (!isXLS) {
      message.error(this.props.intl.formatMessage(messages.form.uploadTip)+'xls、xlsx');
    }
    return isXLS;
  }
  onChange = ({file, fileList, event}) => {
    if (file.status === 'done') {
      this.triggerChange(file.response);
    } else if (file.status === 'error') {
      message.error(`${file.name}`+this.props.intl.formatMessage(messages.form.uploadFailed));
    }
    this.setState({ fileList });
  }
  onRemove = () => {
    this.setState({
      fileList: []
    });
    this.triggerChange('');
  }
  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      if (changedValue == undefined) {
        onChange('');
      } else {
        onChange(changedValue.path);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.value&&this.state.fileList.length==0){
      return true;
    }
    if(nextProps.value&&nextProps.value==this.props.value){
      return false;
    }else{
      return true;
    }
  }
  componentWillReceiveProps(nextProps) {
    const value = nextProps.value;
    let newFileList;
    if(value){
      newFileList=value.split('/')[value.split('/').length-1];
    }else{
      newFileList=newFileList;
    }
    if(value!=undefined&&value){
      this.setState({
        fileList: [
          {
            uid: uuid++,
            name: newFileList,
            status: 'done',
            url: value
          }
        ]
      });
    }
  }
  render(){
    const headers = {
      "Authorization": 'Bearer ' + getLocalStorage("token")
    }
    const file_name = new Date().getTime()+'.xls';
    return (
      <Upload action={`${baseURL}${api.upload_file}`} headers={headers} onChange={this.onChange}  fileList={this.state.fileList} beforeUpload={this.beforeUpload} onRemove={this.onRemove}>
        {this.state.fileList.length>0?'':(
            <Button>
              <Icon type="upload"/>
              <FormattedMessage {...messages.BaseUI.upload}></FormattedMessage>
            </Button>
          )}
      </Upload>
    );
  }
}

export default injectIntl(UploadXLS);
