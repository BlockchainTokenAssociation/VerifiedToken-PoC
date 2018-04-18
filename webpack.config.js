var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: "development",
    entry: './app/js/app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        // Copy our app's index.html to the build folder.
        new CopyWebpackPlugin([
            { from: './app/index.html', to: 'index.html' }
        ])
    ],
    node: {
        fs: "empty"
    }
};