'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _fsExtra = require('fs-extra');

var _reduxReset = require('./reduxReset');

var _reduxReset2 = _interopRequireDefault(_reduxReset);

var _resetIndex = require('./resetIndex');

var _resetIndex2 = _interopRequireDefault(_resetIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (srcProject, destProject, components) => {
    let srcProjectDir = srcProject.dir;
    let destProjectDir = destProject.dir;
    let dev = srcProject.directory.development;
    let destDev = destProject.directory.development;
    let comCfgPath = (0, _path.join)(srcProjectDir, '.vd', 'components');
    let comPath = (0, _path.join)(srcProjectDir, dev.envName, dev.component);
    let conPath = (0, _path.join)(srcProjectDir, dev.envName, dev.container);
    let reduxPath = (0, _path.join)(srcProjectDir, dev.envName, dev.redux);
    let destComCfgPath = (0, _path.join)(destProjectDir, '.vd', 'components');
    let destComPath = (0, _path.join)(destProjectDir, destDev.envName, destDev.component);
    let destConPath = (0, _path.join)(destProjectDir, destDev.envName, destDev.container);
    let destReduxPath = (0, _path.join)(destProjectDir, destDev.envName, destDev.redux);
    if ((0, _fsExtra.existsSync)(destComCfgPath)) (0, _fsExtra.mkdirsSync)(destComCfgPath);
    let destComponents = [];
    (0, _fsExtra.readdirSync)(destComCfgPath).forEach(item => {
        destComponents.push((0, _path.parse)(item).name.toLocaleLowerCase());
    });
    Object.keys(components).forEach(key => {
        if (components[key] && destComponents.indexOf(key.toLocaleLowerCase()) === -1) {
            let cfg = JSON.parse((0, _fsExtra.readFileSync)((0, _path.join)(comCfgPath, key + '.json'), 'utf8'));
            (0, _fsExtra.copySync)((0, _path.join)(comCfgPath, key + '.json'), (0, _path.join)(destComCfgPath, key + '.json'));
            (0, _fsExtra.copySync)((0, _path.join)(comPath, key), (0, _path.join)(destComPath, key));
            if (cfg.type === 1) {
                (0, _fsExtra.copySync)((0, _path.join)(conPath, key + '.js'), (0, _path.join)(destConPath, key + '.js'));
                (0, _fsExtra.copySync)((0, _path.join)(reduxPath, key + '.js'), (0, _path.join)(destReduxPath, key + '.js'));
                (0, _reduxReset2.default)(destReduxPath);
            }
        }
    });
    (0, _resetIndex2.default)(_extends({}, destProject, {
        directory: {
            source: destDev.envName,
            component: destDev.component
        }
    }));
};

module.exports = exports['default'];