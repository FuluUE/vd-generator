import React from 'react';
import PropTypes from 'prop-types';
import Placeholder from '../Placeholder';
import './less/pageForbidden.less';

const PageForbidden = (props) => {
    return (
      <Placeholder
        className='placeholder-403'
        slogan='女汤部，你无权访问该页面'
        extra={ <a href="/">返回首页</a> }
      />
    );
};

export default PageForbidden;
