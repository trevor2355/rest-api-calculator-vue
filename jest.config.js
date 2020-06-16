const path = require('path');
console.log('rootDir: ', path.resolve(__dirname, './.'))
module.exports = {
  rootDir: path.resolve(__dirname, './.'),
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|sass|scss)$': '<rootDir>/tests/mock/styleMock.js',   //<-- add this line to fix css import problem
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(bootstrap-vue)/)', // <-- add this line to fix SyntaxError: Unexpected token import
  ],
  coverageDirectory: '<rootDir>/tests/unit',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**',
  ],
};