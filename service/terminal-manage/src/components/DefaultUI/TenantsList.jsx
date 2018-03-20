import React,{ Component } from 'react'
import { queryTenantsList } from '../../services/TerminalManagement';
import { getLocalStorage } from '../../utils';
import { Select  } from 'antd';
import styles from './searchbar.less';

const Option = Select.Option;

class TenantsList extends Component{

  constructor(props){
    super(props);
    this.state = {
      options: this.props.firstOption,
    }
  }

  componentWillMount = () => {
    this.getTenantsList();
  };

  getTenantsList = () =>{
    const _this = this;
    const token = getLocalStorage('token');
    const firstOption = this.props.firstOption;
    const payload = {
      token,
      page_size:1000,
      page_number:1,
      sort_property:'CREATE_TIME',
      sort_direction:'DESC',
    };
    queryTenantsList({payload}).then((body) => {
      if(body.datas){
        _this.setState({
          options: firstOption.concat(body.datas)
        })
      }
    })
  };

  render(){
    const {title,value,handleChange} = this.props;
    return(
      <div className={styles.select}>
        {
          this.props.title
            ? <span className={styles.title}>{title}：</span>
            : ''
        }
        <Select
          showSearch
          style={{width:200}}
          value={value}
          optionFilterProp="children"
          onChange={handleChange}
          dropdownClassName={styles.dropdownStyle}
          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
          {this.state.options.map((item,index) => {
            return(
              <Option value={item.id.toString()} key={index} title={item.name}>
              {
                item.name
              }
              </Option>
            )
          })}
        </Select>
      </div>
    )
  }
}

export default TenantsList;
