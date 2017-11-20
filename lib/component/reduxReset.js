'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _fsExtra = require('fs-extra');

var _mustache = require('../utils/mustache');

var _mustache2 = _interopRequireDefault(_mustache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = reduxPath => {
  let files = (0, _fsExtra.readdirSync)(reduxPath);
  let sagas = [];
  let reducerImport = [];
  let reducerContent = [];
  let sagaImport = [];
  let sagaContent = [];
  files.forEach(fileName => {
    let filePath = (0, _path.join)(reduxPath, fileName);
    let stat = (0, _fsExtra.statSync)(filePath);
    if (stat.isFile()) {
      if (fileName !== 'sagas.js' && fileName !== 'reducers.js') {
        var _parse = (0, _path.parse)(fileName);

        let name = _parse.name,
            ext = _parse.ext;

        if (ext === '.js') {
          reducerImport.push('import ' + name + ' from \'./' + name + '\';');
          reducerContent.push(name);
          sagaImport.push('import { watchSagas as ' + name + 'Sagas } from \'./' + name + '\';');
          sagaContent.push('...' + name + 'Sagas');
        }
      }
    }
  });

  (0, _fsExtra.writeFileSync)((0, _path.join)(reduxPath, 'reducers.js'), (0, _mustache2.default)('redux/reducerIndex.mustache', {
    importContent: reducerImport.join('\n'),
    content: reducerContent.join(',\n  ')
  }));
  (0, _fsExtra.writeFileSync)((0, _path.join)(reduxPath, 'sagas.js'), (0, _mustache2.default)('redux/sagaIndex.mustache', {
    importContent: sagaImport.join('\n'),
    content: sagaContent.join(',\n    ')
  }));
};

module.exports = exports['default'];