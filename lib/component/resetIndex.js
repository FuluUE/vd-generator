'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = project => {
    let dir = project.dir,
        directory = project.directory;

    if (!_fs2.default.existsSync(dir)) return console.erro('project dir not exist');
    let componentCfgPath = _path2.default.join(dir, '.vd', 'components');
    if (_fs2.default.existsSync(componentCfgPath)) {
        let components = _fs2.default.readdirSync(componentCfgPath);
        let str = '';
        components.forEach(item => {
            let name = _path2.default.parse(item).name;
            if (project.type !== 'library') {
                name = '' + name[0].toUpperCase() + name.substr(1);
            }
            str += 'export { default as ' + name + ' } from \'./' + name + '\';\n';
        });
        let componentPath = _path2.default.join(dir, directory.source, directory.component);
        _fs2.default.writeFileSync(_path2.default.join(componentPath, 'index.js'), str);
    }
};

module.exports = exports['default'];