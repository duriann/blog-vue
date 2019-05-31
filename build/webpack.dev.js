const path = require('path')
const base = require('./webpack.base.js')
const merge = require('webpack-merge')
const url = require('../config/index')

module.exports = merge(base, {
    mode: 'development',
    devServer: {
        // contentBase: path.join(__dirname,'dist'),
        port: 9998,
        host: '127.0.0.1',
        hot: true,
        open: true,
        proxy: {
            '/api': {
                target: url[process.env.NODE_ENV].apiUrl,
                pathRewrite: {
                    '^/api': ''
                },
            }
        },
        // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
        historyApiFallback: {
            index: '/index.html' //与output的publicPath有关(HTMLplugin生成的html默认为index.html)
        },

        
    },
     // 输出 source-map 方便直接调试 ES6 源码
    devtool: 'source-map',
    plugins: [
    ]
})