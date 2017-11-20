'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = createProject;

var _path = require('path');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createProject(_ref) {
    let projectPath = _ref.projectPath,
        config = _ref.config;

    try {
        if (config.type === 'library') {
            let basePath = (0, _path.join)(__dirname, '../../boilerplates/project/library');
            _fsExtra2.default.copySync(basePath, projectPath);
            _fsExtra2.default.writeFileSync((0, _path.join)(projectPath, '.vd', 'project.json'), JSON.stringify(config, null, 2));
        } else {
            let basePath = (0, _path.join)(__dirname, '../../boilerplates/project', config.type);
            let dirConfig = config.directory || {};
            // console.log(basePath, projectPath);
            if (!_fsExtra2.default.existsSync(basePath)) {
                return console.error(basePath + ' not found');
            }

            _fsExtra2.default.copySync(basePath, projectPath);

            dirConfig = config.directory.development;
            dirConfig.source = dirConfig.envName;
            if (config.type === 'pcNative') {
                config.directory.development.envName = 'app';
            }
            _fsExtra2.default.writeFileSync((0, _path.join)(projectPath, '.vd', 'project.json'), JSON.stringify(config, null, 2));

            let appPath = (0, _path.join)(projectPath, 'src', 'router.js');
            if (_fsExtra2.default.existsSync(appPath)) {
                if (config.type !== 'pcNative' && config.routerType !== 'BrowserRouter') {
                    let str = _fsExtra2.default.readFileSync(appPath, 'utf8');
                    _fsExtra2.default.writeFileSync(appPath, str.replace('BrowserRouter', 'HashRouter'));
                }
            }
        }
    } catch (error) {
        _fsExtra2.default.removeSync(projectPath);
        throw error;
    }
}
module.exports = exports['default'];