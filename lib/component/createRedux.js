'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _fsExtra = require('fs-extra');

var _utils = require('../utils');

var _reduxReset = require('./reduxReset');

var _reduxReset2 = _interopRequireDefault(_reduxReset);

var _mustache = require('../utils/mustache');

var _mustache2 = _interopRequireDefault(_mustache);

var _resetIndex = require('./resetIndex');

var _resetIndex2 = _interopRequireDefault(_resetIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (config, opts) => {
    let name = _lodash2.default.upperFirst((0, _utils.camelCase)(opts.name));
    let camelCaseName = (0, _utils.camelCase)(name);
    opts.camelCaseName = camelCaseName;
    let componentPath = (0, _path.join)(config.dir, config.directory.source, config.directory.component, name);
    (0, _fsExtra.mkdirsSync)(componentPath);
    let vdConfigPath = (0, _path.join)(config.dir, '.vd', 'components');
    (0, _fsExtra.mkdirsSync)(vdConfigPath);

    (0, _fsExtra.writeFileSync)((0, _path.join)(componentPath, 'index.js'), (0, _mustache2.default)('component/index.mustache', { name: name }));

    let module = {};
    _lodash2.default.forEach(opts.module, item => {
        module[item] = camelCaseName;
        if (item !== 'style' && item !== 'doc' && item !== '__tests__') {
            (0, _fsExtra.mkdirsSync)((0, _path.join)(componentPath, config.directory[item] || item));
        }
    });

    if (module.__tests__) {
        let testPath = (0, _path.join)(componentPath, '__tests__');
        (0, _fsExtra.mkdirsSync)(testPath);
        (0, _fsExtra.writeFileSync)((0, _path.join)(testPath, camelCaseName + '.js'), (0, _mustache2.default)('component/test.mustache', {
            name: name
        }));
    }

    if (module.style) {
        let stylePath = (0, _path.join)(componentPath, config.directory.style);
        (0, _fsExtra.mkdirsSync)(stylePath);
        (0, _fsExtra.writeFileSync)((0, _path.join)(stylePath, camelCaseName + '.less'), '');
    }
    if (module.doc) {
        let docPath = (0, _path.join)(componentPath, config.directory.document);
        (0, _fsExtra.mkdirsSync)(docPath);
        (0, _fsExtra.writeFileSync)((0, _path.join)(docPath, 'index.md'), name + ' Doc');
    }

    let lifecycle = {};
    let firstLoad = [];

    _lodash2.default.forEach(opts.lifecycle, item => lifecycle[item] = true);

    (0, _fsExtra.writeFileSync)((0, _path.join)(componentPath, name + '.js'), (0, _mustache2.default)('component/component.mustache', _extends({}, opts, {
        lifecycle: lifecycle,
        firstLoad: firstLoad.join(';\n'),
        module: module
    })));

    if (opts.saga) {
        let apiPath = (0, _path.join)(config.dir, config.directory.source, config.directory.config, 'api.js');
        let apiContent = (0, _fsExtra.readFileSync)(apiPath, 'utf8');
        apiContent = apiContent.replace('export default', '').replace(';', '');
        apiContent = JSON.parse(apiContent);
        apiContent[opts.saga.requestVarName] = opts.saga.url;
        (0, _fsExtra.writeFileSync)(apiPath, 'export default ' + JSON.stringify(apiContent, null, 2) + ';');

        let routePath = (0, _path.join)(config.dir, config.directory.source, 'routes');
        if (!(0, _fsExtra.existsSync)(routePath)) {
            (0, _fsExtra.mkdirsSync)(routePath);
        }
        (0, _fsExtra.writeFileSync)((0, _path.join)(routePath, name + '.js'), (0, _mustache2.default)('route.mustache', _extends({
            name: name
        }, opts.saga)));
        let servicePath = (0, _path.join)(config.dir, config.directory.source, 'services');
        if (!(0, _fsExtra.existsSync)(servicePath)) {
            (0, _fsExtra.mkdirsSync)(servicePath);
        }
        (0, _fsExtra.writeFileSync)((0, _path.join)(servicePath, camelCaseName + '.js'), (0, _mustache2.default)('services.mustache', _extends({
            camelCaseName: camelCaseName
        }, opts.saga)));

        let modelPath = (0, _path.join)(config.dir, config.directory.source, 'models');
        if (!(0, _fsExtra.existsSync)(modelPath)) {
            (0, _fsExtra.mkdirsSync)(modelPath);
        }
        (0, _fsExtra.writeFileSync)((0, _path.join)(modelPath, camelCaseName + '.js'), (0, _mustache2.default)('model.mustache', {
            name: name,
            camelCaseName: camelCaseName
        }));
    }

    (0, _fsExtra.writeFileSync)((0, _path.join)(vdConfigPath, camelCaseName + '.json'), JSON.stringify(opts, null, 2));

    (0, _resetIndex2.default)(config);
};

module.exports = exports['default'];