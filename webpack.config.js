const path = require('path');

module.exports = {
  entry: './js-build/test.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '_site/js')
  }
};