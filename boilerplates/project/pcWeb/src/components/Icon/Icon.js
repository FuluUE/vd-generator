import React from 'react';
import PropTypes from 'prop-types';
import './less/icon.less';


const Icon = ({glyph, className, width, height}) => (
    <svg className={className} width={width} height={height} viewBox={glyph.viewBox}>
        {/* 如果 svg sprite extract 选项为 false，使用  */}
        <use xlinkHref={`#${glyph.id}`} />
        {/* 否则，使用 */}
        {/* <use xlinkHref={glyph} /> */}
    </svg>
);

Icon.propTypes = {
    glyph: PropTypes.shape().isRequired,
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
};

Icon.defaultProps = {
    glyph: {},
    className: 'icon',
    width: 1,
    height: 1,
};

export default Icon;
