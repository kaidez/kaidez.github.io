const path = require('path');

module.exports = {
  module : {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ],
  },
  entry: './js-build/helpers.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js')
  }
};