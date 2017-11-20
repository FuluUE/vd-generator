'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = reduxPath => {
  let actions = [];
  if (_fs2.default.existsSync(reduxPath)) {
    let files = _fs2.default.readdirSync(reduxPath);
    files.forEach(fileName => {
      let filePath = _path2.default.join(reduxPath, fileName);
      let stat = _fs2.default.statSync(filePath);
      if (stat.isFile()) {
        if (fileName !== 'sagas.js' && fileName !== 'reducers.js') {
          let content = _fs2.default.readFileSync(filePath, 'utf8');
          let name = _path2.default.parse(fileName).name;
          let pattern = /\('(.*)?'/g;
          let res;
          while ((res = pattern.exec(content)) != null) {
            // result.push({ name: res[3], comment: res[2] });
            actions.push(name + ' ' + res[1]);
          }
        }
      }
    });
  }
  return actions;
};

module.exports = exports['default'];