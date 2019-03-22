const path = require('path')
const base = require('./webpack.base.js')
const merge = require('webpack-merge')

module.exports = merge(base, {
    mode: 'development',
    output: {
        path: path.join(__dirname,'../dist'),
        filename: 'js/[name].[hash].js',//每次保存hash都变化
    },
    devServer: {
        // contentBase: path.join(__dirname,'dist'),加了HtmlWebpackPlugin后好像这个并没有什么卵用了
        port: 9999,
        host: '127.0.0.1',
        hot: true,
        open: true
        // index: 'index.html'
    },
     // 输出 source-map 方便直接调试 ES6 源码
    devtool: 'source-map',
    plugins: []
})