'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _fsExtra = require('fs-extra');

var _resetIndex = require('./resetIndex');

var _resetIndex2 = _interopRequireDefault(_resetIndex);

var _camelCase = require('../utils/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (srcProject, destProject, components) => {
    let srcProjectDir = (0, _path.join)(srcProject.dir, 'src');
    let destProjectDir = (0, _path.join)(destProject.dir, 'src');

    let comCfgPath = (0, _path.join)(srcProject.dir, '.vd', 'components');
    let comPath = (0, _path.join)(srcProjectDir, 'components');
    let conPath = (0, _path.join)(srcProjectDir, 'routes');
    let reduxPath = (0, _path.join)(srcProjectDir, 'services');
    let modelPath = (0, _path.join)(srcProjectDir, 'models');

    let destComCfgPath = (0, _path.join)(destProject.dir, '.vd', 'components');
    let destComPath = (0, _path.join)(destProjectDir, 'components');
    let destConPath = (0, _path.join)(destProjectDir, 'routes');
    let destReduxPath = (0, _path.join)(destProjectDir, 'services');
    let destModelsPath = (0, _path.join)(destProjectDir, 'models');
    if ((0, _fsExtra.existsSync)(destComCfgPath)) (0, _fsExtra.mkdirsSync)(destComCfgPath);
    let destComponents = [];
    (0, _fsExtra.readdirSync)(destComCfgPath).forEach(item => {
        destComponents.push(item.toLocaleLowerCase());
    });
    Object.keys(components).forEach(filename => {
        if (components[filename] && destComponents.indexOf(filename.toLocaleLowerCase()) === -1) {
            let cfg = (0, _fsExtra.readJSONSync)((0, _path.join)(comCfgPath, filename), 'utf8');
            (0, _fsExtra.copySync)((0, _path.join)(comCfgPath, filename), (0, _path.join)(destComCfgPath, filename));

            // begin copy components
            let componentPath = comPath;
            let destComponentPath = destComPath;
            if (cfg.group) {
                let paths = cfg.group.split('>').map(e => e.trim());
                paths.forEach(item => componentPath = (0, _path.join)(componentPath, item));
                paths.forEach(item => destComponentPath = (0, _path.join)(destComponentPath, item));
            }
            (0, _fsExtra.copySync)((0, _path.join)(componentPath, cfg.name), (0, _path.join)(destComponentPath, cfg.name));
            // end copy components


            if (cfg.type === 1) {
                (0, _fsExtra.copySync)((0, _path.join)(conPath, cfg.name + '.js'), (0, _path.join)(destConPath, (0, _camelCase2.default)(cfg.name) + '.js'));
                (0, _fsExtra.copySync)((0, _path.join)(reduxPath, cfg.name + '.js'), (0, _path.join)(destReduxPath, (0, _camelCase2.default)(cfg.name) + '.js'));
                (0, _fsExtra.copySync)((0, _path.join)(modelPath, cfg.name + '.js'), (0, _path.join)(destModelsPath, (0, _camelCase2.default)(cfg.name) + '.js'));
            }
        }
    });
    (0, _resetIndex2.default)(_extends({}, destProject));
};

module.exports = exports['default'];