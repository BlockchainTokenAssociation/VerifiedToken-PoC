var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals({
    // whitelist: ['web3']
  })],
  node: {
      fs: "empty"
  }
};