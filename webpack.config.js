const path = require('path');

module.exports = {
  entry: './js-build/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js')
  },
  devServer: {
    inline: true,
    contentBase: './_site',
    port: 4000
  },
  module : {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};