const path = require('path')
const base = require('./webpack.base.js')
const merge = require('webpack-merge')

module.exports = merge(base, {
    mode: 'development',
    devServer: {
        // contentBase: path.join(__dirname,'dist'),
        port: 9999,
        host: '127.0.0.1',
        hot: true,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:7777',
                pathRewrite: {
                    '^/api': ''
                },
            }
        }
        
    },
     // 输出 source-map 方便直接调试 ES6 源码
    devtool: 'source-map',
    plugins: []
})