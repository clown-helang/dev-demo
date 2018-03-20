import { Input, Icon, Modal, InputNumber } from 'antd';
import { isTrue } from '../../utils'
const messages = window.appLocale.messages;

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  };
  check = () => {
    const { code,onChange } = this.props;
    const value = this.state.value;
    if(code==='time_server_url'||code==='bigdata_reported_server_url'||code==='website_url'){
      const reg =/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
      if(isTrue(value)&&!reg.test(value)){
        Modal.warning({
          title: messages["URLInputIllegal"],
          content: messages.URLExample,
          onOk: () => {
            this.refs.input.focus()
          }
        });
      } else{
        this.setState({ editable: false });
        this.props.handleEditState(this.props.id,false);
        onChange(code,this.state.value);
      }
    }
    if(code==='beat_time_interval'||code==='network_connect_time_out'){
      if(isTrue(value)&&(this.state.value<1||isNaN(value))){
        Modal.warning({
          title: messages["timeInputIllegal"],
          content: messages.TimeExample,
          onOk: () => {
            this.refs.input.focus()
          }
        });
      } else{
        this.setState({ editable: false });
        this.props.handleEditState(this.props.id,false);
        onChange(code,this.state.value);
      }
    }
  };
  edit = () => {
    this.setState({ editable: true });
    this.props.handleEditState(this.props.id,true);
  };
  render(){
    const { code, value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper" style={{width:'100%'}}>
              {
                code === 'beat_time_interval' || code === 'network_connect_time_out'
                ? <InputNumber value={value} onChange={this.handleChange} onPressEnter={this.check} style={{width:'70%'}} ref="input"/>
                : <Input value={value} onChange={this.handleChange} onPressEnter={this.check} style={{width:'70%'}} ref="input"/>
              }

              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
                style={{fontSize: 18,float:'right',position:'relative',right:10,top:5}}
              />
            </div>
            : <div className="editable-cell-text-wrapper" style={{width:'100%'}}>
              <span>
              {value || ' '}
              </span>
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
                style={{fontSize: 14,float:'right',position:'relative',right:10,top:2}}
              />
            </div>
        }
      </div>
    );
  }
}
export default EditableCell;
