'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _fsExtra = require('fs-extra');

var _resetIndex = require('./resetIndex');

var _resetIndex2 = _interopRequireDefault(_resetIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (project, component) => {
    let dev = project.directory.development;
    let name = component.name,
        type = component.type,
        group = component.group;


    let filename = name + '.json';
    if (group) {
        filename = group.replace(/>/g, '-') + '-' + name + '.json';
    }

    (0, _fsExtra.removeSync)((0, _path.join)(project.dir, '.vd', 'components', filename));

    let baseComponentPath = (0, _path.join)(project.dir, 'src', 'components');

    if (group) {
        let paths = group.split('>').map(e => e.trim());
        paths.forEach(item => baseComponentPath = (0, _path.join)(baseComponentPath, item));
    }

    (0, _fsExtra.removeSync)((0, _path.join)(baseComponentPath, name));

    if (type === 1) {
        (0, _fsExtra.removeSync)((0, _path.join)(project.dir, 'src', 'models', name + '.js'));
        (0, _fsExtra.removeSync)((0, _path.join)(project.dir, 'src', 'routes', name + '.js'));
        (0, _fsExtra.removeSync)((0, _path.join)(project.dir, 'src', 'services', name + '.js'));
    }
    (0, _resetIndex2.default)(_extends({}, project));
};

module.exports = exports['default'];