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

exports.default = (project, component) => {
    let dev = project.directory.development;
    let name = component.name,
        type = component.type;

    (0, _fsExtra.removeSync)((0, _path.join)(project.dir, '.vd', 'components', name + '.json'));
    (0, _fsExtra.removeSync)((0, _path.join)(project.dir, dev.envName, dev.component, name));
    if (type === 1) {
        (0, _fsExtra.removeSync)((0, _path.join)(project.dir, dev.envName, dev.container, name + '.js'));
        // removeSync(join(project.dir, dev.envName, dev.redux, `${name}.js`));
        (0, _fsExtra.removeSync)((0, _path.join)(project.dir, dev.envName, 'models', name + '.js'));
        (0, _fsExtra.removeSync)((0, _path.join)(project.dir, dev.envName, 'routes', name + '.js'));
        (0, _fsExtra.removeSync)((0, _path.join)(project.dir, dev.envName, 'services', name + '.js'));
        // reduxReset(join(project.dir, dev.envName, dev.redux));
    }
    (0, _resetIndex2.default)(_extends({}, project, {
        directory: {
            source: dev.envName,
            component: dev.component
        }
    }));
};

module.exports = exports['default'];