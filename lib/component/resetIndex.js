'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function read(filepath, componentPath, parentPath) {
    var _path$parse = _path2.default.parse(filepath);

    let name = _path$parse.name,
        ext = _path$parse.ext;

    if (_fsExtra2.default.statSync(filepath).isDirectory()) {
        let components = _fsExtra2.default.readdirSync(filepath);
        return components.map(item => read(_path2.default.join(filepath, item), componentPath, filepath)).join('\n');
    } else if (name !== 'index' && ext === '.js') {
        return 'export { default as ' + name + ' } from \'./' + _path2.default.relative(componentPath, parentPath).replace(/\\/g, '/') + '\';';
    }
}

exports.default = (_ref) => {
    let dir = _ref.dir,
        type = _ref.type;

    if (!_fsExtra2.default.existsSync(dir)) return console.error('project dir not exist');
    let componentPath = _path2.default.join(dir, 'src', 'components');
    if (_fsExtra2.default.existsSync(componentPath)) {
        let components = _fsExtra2.default.readdirSync(componentPath);
        _fsExtra2.default.writeFileSync(_path2.default.join(componentPath, 'index.js'), read(componentPath, componentPath));
    }
};

module.exports = exports['default'];