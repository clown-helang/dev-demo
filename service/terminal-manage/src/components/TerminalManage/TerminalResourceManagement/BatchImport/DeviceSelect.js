import { Input, Button, Row, Col, } from 'antd';
import TerminalDeviceModelList from '../../../DefaultUI/TerminalDeviceModelList'

class DeviceSelect extends React.Component {
  constructor(props) {
    super(props);
  }
  onChange = (value) => {
    this.triggerChange(value);
  };

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  };
  render() {
    return (
     <div>
       <TerminalDeviceModelList handleChange={this.onChange}/>
     </div>
    );
  }
}
export default DeviceSelect;
