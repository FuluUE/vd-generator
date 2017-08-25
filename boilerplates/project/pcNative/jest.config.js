module.exports = {
  // rootDir: 'C:/Users/xuzhiheng/Desktop/Asf',
  // roots: ['C:/Users/xuzhiheng/Desktop/Asf'],
  verbose: true,
  moduleFileExtensions: [
    'js',
    'jsx'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '.*\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js'
  },
  moduleDirectories: [
    'node_modules',
    'app/node_modules'
  ],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
};
