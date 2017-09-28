import React from 'react';
import PropTypes from 'prop-types';
import Placeholder from '../Placeholder';
import './less/pageNetworkError.less';

const PageNetworkError = (props) => (
    <Placeholder
    className='placeholder-network-error'
    slogan='看不见我了吧！点击刷新试试！'
    extra={ <a href="javascript:;" onClick={ () => window.location.reload() }>刷新</a> }
  />
);

export default PageNetworkError;
