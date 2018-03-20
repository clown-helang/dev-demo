import React from 'react';
import PropTypes from 'prop-types';
import { Select  } from 'antd';
import { get_length, cut_str } from '../../utils';
import styles from './searchbar.less';

const Option = Select.Option;
/**
 * 搜索框
 */

const SearchSelectBar = ({title, options, value, handleChange}) => {
  return (
    <div className={styles.select}>
      {
        title
        ? <span className={styles.title}>{title}：</span>
        : ''
      }
      <Select style={{width:200}} className={styles.options} value={value.toString()} onChange={handleChange}>
        {options.map((item,index) => {
          if (index>0){
            return(
              <Option value={item.id.toString()} key={index}>{item.provider+'：'+item.device_type+'：'+item.name}</Option>
            )
          }
          else{
            return(
              <Option value={item.id.toString()} key={index}>{item.name}</Option>
            )
          }
        })}
      </Select>
    </div>
  );
};

export default SearchSelectBar;











