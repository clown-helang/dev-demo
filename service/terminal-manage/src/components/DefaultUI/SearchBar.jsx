import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import { get_length, cut_str, trim } from '../../utils';
import styles from './searchbar.less';

/**
 * 搜索框
 */
const Search = Input.Search;
class SearchBar  extends React.Component{
  constructor(props) {
    super(props);
  }
  handleChange = (event) => {
    const max_length = 50;
    const _vaule = trim(event.target.value);
    const payload = {};
    if(get_length(_vaule)>=max_length){
      payload[this.props.valueName] = cut_str(_vaule,max_length);
      this.props.dispatch({type:this.props.modalName, payload});
    }else{
      payload[this.props.valueName] = _vaule;
      this.props.dispatch({type:this.props.modalName, payload});
    }
  };
  render(){
    const {title, tip, search, enterButton } = this.props;
    return (
      <div className={styles.search}>
        <h5 className={styles.title}>{title}：</h5>
        {
          enterButton
            ? <Search enterButton placeholder={tip} onSearch={search} autoComplete="off" value={this.props.value} onChange={this.handleChange} />
            : <Search placeholder={tip} onSearch={search} autoComplete="off" value={this.props.value} onChange={this.handleChange} />
        }

      </div>
    );
  }
}

export default SearchBar;
