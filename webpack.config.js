var path = require('path');

module.exports = {
  mode: "production",
  entry: [
    './demo/app.js',
    'webpack-dev-server/client?http://localhost:8080'
    ],
  output: {
      path: path.resolve(__dirname, 'demo/assets'),
  },
  plugins: [
  ],
  node: {
      fs: "empty"
  }
};