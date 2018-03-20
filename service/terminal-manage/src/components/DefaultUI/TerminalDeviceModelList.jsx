import React,{ Component } from 'react'
import { connect } from 'dva'
import { queryDeviceModels } from '../../services/BatchImport';
import { getLocalStorage } from '../../utils';
import TerSearchSelectBar from './TerSearchSelectBar'

class TerminalDeviceModelList extends Component{

  constructor(props){
    super(props);
    this.state = {
      options: []
    }
  }

  componentWillMount = () => {
    const _this = this;
    const token = getLocalStorage('token');
    const payload = {
      token,
      page_size:1000,
      page_number:1,
      sort_property:'CREATE_TIME',
      sort_direction:'DESC',
    };
    queryDeviceModels({payload}).then((body) => {
      if(body.datas){
        _this.setState({
          options: body.datas
        })
      }
    })
  };

  render(){
    return(
      <TerSearchSelectBar title={this.props.title} options={this.state.options} handleChange={this.props.handleChange}/>
    )
  }
}

export default TerminalDeviceModelList;
