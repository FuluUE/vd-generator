import React from 'react';
import PropTypes from 'prop-types';
import './less/placeholder.less';

const Placeholder = (props) => (
  <div className={'placeholder ' + props.className}>
    <div className="placeholder-inner">
      <div className="placeholder-icon">{ props.icon }</div>
      <h3>{ props.slogan }</h3>
      { props.description !== null ? <p>{props.description}</p> : null }
      { props.extra }
    </div>
  </div>
);

Placeholder.propTypes = {
  className: PropTypes.string.isRequired,
  slogan: PropTypes.string.isRequired,
  icon: PropTypes.string,
  description: PropTypes.string,
  extra: PropTypes.element,
};

Placeholder.defaultProps = {
  className: 'placeholder-default',
  slogan: '占位标语',
  icon: null,
  description: null,
  extra: null,
};

export default Placeholder;
