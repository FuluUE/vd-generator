'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createComponent;

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

function createComponent(config) {
    let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { type: 0 };


    let baseComponentPath = (0, _path.join)(config.dir, config.directory.source, config.directory.component);

    if (opts.group) {
        let paths = opts.group.split('>').map(e => e.trim());
        paths.forEach(item => baseComponentPath = (0, _path.join)(baseComponentPath, item));
    }

    if (config.type === 'library') {
        let componentPath = (0, _path.join)(baseComponentPath, opts.name);
        (0, _fsExtra.mkdirsSync)(componentPath);
        (0, _fsExtra.writeFileSync)((0, _path.join)(componentPath, 'index.js'), '');
        let module = {};
        _lodash2.default.forEach(opts.module, item => {
            module[item] = opts.name;
            if (item !== 'doc') {
                (0, _fsExtra.mkdirsSync)((0, _path.join)(componentPath, config.directory[item] || item));
            }
        });

        if (module.doc) {
            let docPath = (0, _path.join)(componentPath, config.directory.document);
            (0, _fsExtra.mkdirsSync)(docPath);
            (0, _fsExtra.writeFileSync)((0, _path.join)(docPath, 'index.md'), name + ' Doc');
        }

        let vdConfigPath = (0, _path.join)(config.dir, '.vd', 'components');
        (0, _fsExtra.mkdirsSync)(vdConfigPath);
        (0, _fsExtra.writeFileSync)((0, _path.join)(vdConfigPath, opts.name + '.json'), JSON.stringify(opts, null, 2));
    } else {
        if (opts.type === 0 || opts.type === 1 || opts.type === 3) {
            let name = _lodash2.default.upperFirst((0, _utils.camelCase)(opts.name));
            let camelCaseName = (0, _utils.camelCase)(name);
            opts.camelCaseName = camelCaseName;
            let componentPath = (0, _path.join)(baseComponentPath, name);
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

            if (opts.format !== 'function') {
                let lifecycle = {};
                let firstLoad = [];

                _lodash2.default.forEach(opts.lifecycle, item => lifecycle[item] = true);

                if (opts.type === 1) {
                    let reduxPath = (0, _path.join)(config.dir, config.directory.source, config.directory.redux);
                    (0, _fsExtra.mkdirsSync)(reduxPath);
                    let actionGroups = {};
                    let exportActions = [];
                    let mapStateToProps = [];

                    let apiPath = (0, _path.join)(config.dir, config.directory.source, config.directory.config, 'api.js');
                    let apiContent = (0, _fsExtra.readFileSync)(apiPath, 'utf8');
                    apiContent = apiContent.replace('export default', '').replace(';', '');
                    apiContent = JSON.parse(apiContent);
                    apiContent[opts.sagas[0].requestVarName] = opts.sagas[0].url;
                    (0, _fsExtra.writeFileSync)(apiPath, 'export default ' + JSON.stringify(apiContent, null, 2) + ';');

                    opts.sagas.forEach(item => {
                        let actionType = (0, _utils.camelCase)(item.actionName);
                        (0, _fsExtra.writeFileSync)((0, _path.join)(reduxPath, camelCaseName + '.js'), (0, _mustache2.default)('redux/saga.mustache', _extends({}, item, {
                            method: item.method.toLowerCase(),
                            actionName: item.actionName.toUpperCase(),
                            prefix: camelCaseName.toUpperCase(),
                            actionType: actionType
                        })));
                        actionGroups[camelCaseName] = [];
                        exportActions.push(actionType);
                        actionGroups[camelCaseName].push(actionType);
                        mapStateToProps.push(actionType + 'Result: state.' + _lodash2.default.camelCase(name) + '.' + actionType + 'Result');
                    });

                    let containerPath = (0, _path.join)(config.dir, config.directory.source, config.directory.container);
                    (0, _fsExtra.mkdirsSync)(containerPath);
                    var _opts$import = opts.import,
                        _opts$import$actions = _opts$import.actions;
                    let actions = _opts$import$actions === undefined ? [] : _opts$import$actions;
                    var _opts$import$first = _opts$import.first;
                    let first = _opts$import$first === undefined ? [] : _opts$import$first;

                    first.forEach(item => {
                        var _item$split = item.split(' '),
                            _item$split2 = _slicedToArray(_item$split, 2);

                        let name = _item$split2[0],
                            actionName = _item$split2[1];

                        let actionType = _lodash2.default.camelCase(actionName);
                        firstLoad.push('this.props.' + actionType + '()');
                    });
                    let importContent = '';
                    actions.forEach(item => {
                        var _item$split3 = item.split(' '),
                            _item$split4 = _slicedToArray(_item$split3, 2);

                        let reducerName = _item$split4[0],
                            actionName = _item$split4[1];

                        if (!actionGroups[reducerName]) {
                            actionGroups[reducerName] = [];
                        }
                        let actionType = _lodash2.default.camelCase(actionName);
                        exportActions.push(actionType);
                        actionGroups[reducerName].push(actionType);
                        mapStateToProps.push(actionType + 'Result: state.' + _lodash2.default.camelCase(reducerName) + '.' + actionType + 'Result');
                    });
                    Object.keys(actionGroups).forEach(key => {
                        importContent += 'import { ' + actionGroups[key].join(', ') + ' } from \'../' + config.directory.redux + '/' + key + '\';\n';
                    });

                    (0, _fsExtra.writeFileSync)((0, _path.join)(containerPath, name + '.js'), (0, _mustache2.default)('container/container.mustache', _extends({}, opts, {
                        componentDir: config.directory.component,
                        importContent: importContent,
                        mapStateToProps: mapStateToProps.join(',\n'),
                        exportActions: exportActions.join(', ')
                    })));

                    (0, _reduxReset2.default)(reduxPath);
                }

                (0, _fsExtra.writeFileSync)((0, _path.join)(componentPath, name + '.js'), (0, _mustache2.default)('component/component.mustache', _extends({}, opts, {
                    lifecycle: lifecycle,
                    firstLoad: firstLoad.join(';\n'),
                    module: module
                })));
            } else {
                (0, _fsExtra.writeFileSync)((0, _path.join)(componentPath, name + '.js'), (0, _mustache2.default)('component/function.mustache', _extends({}, opts, {
                    module: module
                })));
            }

            let filename = camelCaseName + '.json';
            if (opts.group) {
                filename = opts.group + '>' + camelCaseName + '.json';
            }

            (0, _fsExtra.writeFileSync)((0, _path.join)(vdConfigPath, filename), JSON.stringify(opts, null, 2));
        }
    }

    (0, _resetIndex2.default)(config);
}
module.exports = exports['default'];