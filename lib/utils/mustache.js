'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = render;

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

var _path = require('path');

var _fsExtra = require('fs-extra');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(filename, obj) {
    return _mustache2.default.render((0, _fsExtra.readFileSync)((0, _path.join)(__dirname, '../../boilerplates/react', filename), 'utf-8'), obj);
}
module.exports = exports['default'];