import React,{Component} from 'react';
import {Upload, message, Button, Icon} from 'antd';
import {injectIntl, FormattedMessage} from 'react-intl';
import {getLocalStorage} from '../../utils';
import {baseURL} from '../../utils/config';
import api from '../../utils/api';
import messages from './messages';

let uuid = 0;
class UploadFile extends Component{
  constructor(props) {
    super(props);
    this.state = {fileList: []}
  }
  onChange = ({file, fileList, event}) => {
    if (file.status === 'done') {
      this.triggerChange(file.response);
    } else if (file.status === 'error') {
      message.error(`${file.name}`+this.props.intl.formatMessage(messages.form.uploadFailed));
    }
    this.setState({ fileList });
  };
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
  componentWillReceiveProps(nextProps) {
    const value = nextProps.value;
    if(nextProps.value!=undefined&&(this.props.original_file_name!==nextProps.original_file_name)){
      if(nextProps.value.startsWith('http://')&&nextProps.original_file_name&&value){
        this.setState({
          fileList: [
            {
              uid: uuid++,
              name: nextProps.original_file_name,
              status: 'done',
              url: value
            }
          ]
        });
      }
    }

  }
  render(){
    const headers = {
      "Authorization": 'Bearer ' + getLocalStorage("token")
    }
    return (
      <Upload action={`${baseURL}${api.upload_file}`} headers={headers} onChange={this.onChange}  fileList={this.state.fileList} onRemove={this.onRemove}>
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

export default injectIntl(UploadFile);
