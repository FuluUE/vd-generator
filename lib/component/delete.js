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

exports.default = (project, component) => {
    let name = component.name,
        type = component.type,
        group = component.group;


    let paths = (0, _utils.getPaths)({ dir: project.dir, group: group, name: name });

    (0, _fsExtra.removeSync)(paths.vdConfig);
    (0, _fsExtra.removeSync)(paths.component);

    if (type === 1 || type === '1') {
        (0, _fsExtra.removeSync)((0, _path.join)(paths.model, name + '.js'));
        (0, _fsExtra.removeSync)((0, _path.join)(paths.route, name + '.js'));
        (0, _fsExtra.removeSync)((0, _path.join)(paths.service, name + '.js'));
    }
    (0, _resetIndex2.default)(_extends({}, project));
};

module.exports = exports['default'];