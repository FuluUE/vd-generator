import React from 'react';
import PropTypes from 'prop-types';
import Placeholder from '../Placeholder';
import './less/pageServerError.less';

const PageServerError = (props) => (
  <Placeholder
    className='placeholder-500'
    slogan='听爷爷我唱完一曲，工程狮就回来了！'
    extra={ <a href="/">返回首页</a> }
  />
);

export default PageServerError;
