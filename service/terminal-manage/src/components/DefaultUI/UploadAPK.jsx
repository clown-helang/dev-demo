import React,{Component} from 'react';
import {Upload, message, Button, Icon} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import {getLocalStorage} from '../../utils';
import {baseURL} from '../../utils/config';
import api from '../../utils/api';
import messages from './messages';
import styles from './UploadAPK.less';

class UploadAPK extends Component{
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      filename:''
    }
  }
  beforeUpload = (file) => {
    const isAPK = file.name.endsWith('.apk');
    if (!isAPK) {
      message.error(this.props.intl.formatMessage(messages.form.uploadTip)+'apk');
      return false;
    }else{
      this.setState({file_name:file.name});
      return isAPK;
    }
  }
  onChange = ({file, fileList, event}) => {
    if (file.status === 'done') {
      const resultInfo = file.response;
      resultInfo.size = Math.round(resultInfo.size/(1024*1024)*100)/100;
      this.setState({
        fileList: fileList,
        info:resultInfo,
      });
      this.triggerChange(file.response);
      this.triggerDataChange(resultInfo);
    } else if (file.status === 'error') {
      this.setState({
        fileList: []
      });
      this.triggerDataChange(null);
      message.error(`${file.name}`+this.props.intl.formatMessage(messages.form.uploadFailed));
    } else if (file.status === 'uploading') {
      this.setState({
        fileList: fileList,
        info:fileList,
      });
    }else{
      this.setState({
        fileList: []
      });
    }
  }
  onRemove = () => {
    this.setState({
      fileList: []
    });
    this.triggerChange('');
    this.triggerDataChange(null);
  }
  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      if (changedValue == undefined) {
        onChange('');
      } else {
        onChange(changedValue.temp_apk_path);
      }
    }
  }
  triggerDataChange = (changedValue) => {
    const dataChange = this.props.dataChange;
    if (dataChange) {
      if (changedValue == undefined) {
        dataChange('');
      } else {
        dataChange(changedValue);
      }
    }
  }
  render(){
    const headers = {
      "Authorization": 'Bearer ' + getLocalStorage("token")
    }
    return (
        <Upload action={`${baseURL}${api.getParseInfo}`} headers={headers} onChange={this.onChange} beforeUpload={this.beforeUpload} fileList={this.state.fileList} onRemove={this.onRemove}>
          {this.state.fileList.length>0?'':(
            <Button>
              <Icon type="upload"/>
              <FormattedMessage {...messages.BaseUI.upload}/>
            </Button>
          )}
        </Upload>
    );
  }
}

export default injectIntl(UploadAPK);
