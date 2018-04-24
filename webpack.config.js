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
  externals: [nodeExternals({
    whitelist: ['web3']
  })],
  //
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       include: [
  //         path.resolve(__dirname, "demo/assets"),
  //         path.resolve(__dirname, "node_modules/web3")
  //       ],
  //       use: {
  //         loader: 'babel-loader',
  //         options: {
  //           presets: ['@babel/preset-env']
  //         }
  //       }
  //     }
  //   ]
  // },

  node: {
      fs: "empty"
  }
};