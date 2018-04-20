var path = require('path');

module.exports = {
    mode: "development",
    entry: './demo/app.js',
    output: {
        path: path.resolve(__dirname, 'demo/assets'),
    },
    plugins: [
    ],
    node: {
        fs: "empty"
    }
};