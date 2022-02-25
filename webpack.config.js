const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const Jarvis = require('webpack-jarvis')

module.exports = {
  entry: './js-build/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'js')
  },
  module : {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: [
    new UglifyJSPlugin(),
    new Jarvis(),
    new webpack.SourceMapDevToolPlugin({})
  ],
  mode: 'development'
};