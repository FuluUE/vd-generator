import React from 'react';
import PropTypes from 'prop-types';
import Placeholder from '../Placeholder';
import './less/pageNotFound.less';

const PageNotFound = (props) => {
  return (
    <Placeholder
      className='placeholder-404'
      slogan='蛇精出来捣乱啦！ 快跑呀！！'
      extra={ <a href="/">返回首页</a> }
    />
  );
};

export default PageNotFound;
