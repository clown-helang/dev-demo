import React from 'react';
import PropTypes from 'prop-types';
import { Select  } from 'antd';
import { get_length, cut_str } from '../../utils';
import styles from './searchbar.less';

const Option = Select.Option;
/**
 * 搜索框
 */

const SearchSelectBar = ({title, options, handleChange}) => {
  return (
    <div className={styles.select}>
      {
        title?<span className={styles.title}>{title}：</span>:''
      }
      <Select style={{width:200}} defaultValue="请选择" onChange={handleChange} dropdownClassName={styles.dropdownStyle}>
        {options.map((item,index) => {
          //待修改
          let option = item.device_type+' : '+item.provider+' : '+item.name;
          return(
            <Option value={item.id.toString()} key={index} title={option}>
              {
                option
              }
            </Option>
          )
        })}
      </Select>
    </div>
  );
};

export default SearchSelectBar;











