var path = require('path');

var hostname = 'localhost',
    port = 3001;

module.exports = {
    entry: 'mocha!./test/test.js',
    output: {
        filename: 'test.bundle.js',
        path: path.join(__dirname, 'test'),
        publicPath: 'http://' + hostname + ':' + port + '/test'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /(\.css|\.less)$/,
                loader: 'null-loader'
            },
            {
                test: /(\.jpg|\.jpeg|\.png|\.gif)$/,
                loader: 'null-loader'
            }
        ]
    },
    devServer: {
        host: hostname,
        port: port
    }
};