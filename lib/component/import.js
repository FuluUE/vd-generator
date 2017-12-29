'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _fsExtra = require('fs-extra');

var _resetIndex = require('./resetIndex');

var _resetIndex2 = _interopRequireDefault(_resetIndex);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (srcProject, destProject, components) => {
    let destComponents = [];
    let destComCfgPath = (0, _path.join)(destProject.dir, '.vd', 'components');
    (0, _fsExtra.readdirSync)(destComCfgPath).forEach(item => {
        destComponents.push(item.toLocaleLowerCase());
    });
    Object.keys(components).forEach(filename => {
        if (components[filename] && destComponents.indexOf(filename.toLocaleLowerCase()) === -1) {
            let cfg = (0, _fsExtra.readJSONSync)((0, _path.join)(comCfgPath, filename), 'utf8');

            let paths = (0, _utils.getPaths)({ dir: srcProject.dir, group: cfg.group, name: cfg.name });
            let destPaths = (0, _utils.getPaths)({ dir: destProject.dir, group: cfg.group, name: cfg.name });

            (0, _fsExtra.copySync)(paths.vdConfig, destPaths.vdConfig);
            (0, _fsExtra.copySync)(paths.component, destPaths.component);

            if (cfg.type === 1 || cfg.type === '1') {
                (0, _fsExtra.copySync)((0, _path.join)(paths.route, cfg.name + '.js'), (0, _path.join)(destPaths.route, (0, _utils.camelCase)(cfg.name) + '.js'));
                (0, _fsExtra.copySync)((0, _path.join)(paths.model, cfg.name + '.js'), (0, _path.join)(destPaths.model, (0, _utils.camelCase)(cfg.name) + '.js'));
                (0, _fsExtra.copySync)((0, _path.join)(paths.service, cfg.name + '.js'), (0, _path.join)(destPaths.service, (0, _utils.camelCase)(cfg.name) + '.js'));
            }
        }
    });
    (0, _resetIndex2.default)(_extends({}, destProject));
};

module.exports = exports['default'];