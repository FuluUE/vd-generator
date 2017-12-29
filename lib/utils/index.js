'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPaths = exports.camelCase = undefined;

var _path = require('path');

var _fsExtra = require('fs-extra');

var _camelCase = require('./camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.camelCase = _camelCase2.default;
let getPaths = exports.getPaths = (_ref) => {
    let dir = _ref.dir,
        name = _ref.name,
        group = _ref.group;

    let component = (0, _path.join)(dir, 'src', 'components');
    let route = (0, _path.join)(dir, 'src', 'routes');
    let service = (0, _path.join)(dir, 'src', 'services');
    let model = (0, _path.join)(dir, 'src', 'models');
    let vdConfig = (0, _path.join)(dir, '.vd', 'components');
    let groupPath = '';

    (0, _fsExtra.mkdirsSync)(vdConfig);

    if (group) {
        let paths = group.split('>').map(e => e.trim());

        groupPath = group.replace(/>/g, '/') + '/';

        paths.forEach(item => component = (0, _path.join)(component, item));
        paths.forEach(item => route = (0, _path.join)(route, item));
        paths.forEach(item => service = (0, _path.join)(service, item));
        paths.forEach(item => model = (0, _path.join)(model, item));

        component = (0, _path.join)(component, name);

        vdConfig = (0, _path.join)(vdConfig, group.replace(/>/g, '-') + '-' + (0, _camelCase2.default)(name) + '.json');
    } else {
        vdConfig = (0, _path.join)(vdConfig, (0, _camelCase2.default)(name) + '.json');
    }
    return { component: component, route: route, service: service, model: model, vdConfig: vdConfig, groupPath: groupPath };
};