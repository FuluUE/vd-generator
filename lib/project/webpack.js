'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = webpack;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _fsExtra = require('fs-extra');

var _mustache = require('../utils/mustache');

var _mustache2 = _interopRequireDefault(_mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function webpack(config, destPath) {
    let debug = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    config = _lodash2.default.cloneDeep(config);
    if (debug && config.general.publicPath === '.') {
        config.general.publicPath = '';
    }
    if (config.dir !== '__dirname') {
        config.dir = '\'' + config.dir.replace(/\\/g, '/') + '\'';
    }
    config.compiler.css.less.minimize = JSON.stringify(config.compiler.css.less.minimize);
    config.compiler.css.postcss.autoprefixer = JSON.stringify(config.compiler.css.postcss.autoprefixer);
    config.compiler.css.postcss.pxtorem = JSON.stringify(config.compiler.css.postcss.pxtorem);
    config.general.resolve.alias = JSON.stringify(config.general.resolve.alias);
    config.general.resolve.extensions = JSON.stringify(config.general.resolve.extensions);
    config.general.resolve.mainFields = JSON.stringify(config.general.resolve.mainFields);
    config.general.externals = JSON.stringify(config.general.externals);
    config.theme = JSON.stringify(theme);
    config.pc = config.platform === 'pc';
    if (typeof config.dll.content === 'object') {
        config.dll.content = JSON.stringify(config.dll.content);
    }
    config.dll.target = JSON.stringify(config.dll.target);
    config.isDebug = debug;
    // writeFileSync(destPath,
    //     render(debug ? 'webpack/webpack.dev.mustache' : 'webpack/webpack.prod.mustache', config)
    // );
    (0, _fsExtra.writeFileSync)((0, _path.join)(destPath, debug ? 'webpack.config.dev.js' : 'webpack.config.prod.js'), (0, _mustache2.default)('webpack/webpack.config.mustache', config));
    (0, _fsExtra.writeFileSync)((0, _path.join)(destPath, 'webpack.config.dll.js'), (0, _mustache2.default)('webpack/webpack.dll.mustache', config));
}
module.exports = exports['default'];