var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: [
    './demo/app.js'
    ],
  output: {
      path: path.resolve(__dirname, 'demo/assets'),
  },
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  plugins: [
  ],
  node: {
      fs: "empty"
  }
};