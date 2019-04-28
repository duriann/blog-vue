const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.base.js')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let result =  merge(base,{
    mode: 'production',

    output: {
        path: path.join(__dirname,'../dist'),
        filename: 'js/[name].[contenthash].js'//只有内容改变名称才变
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!index.html']//默认是根据output中的path为基目录
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css"
        }),
        //分析打包文件大小
        new BundleAnalyzerPlugin(),
       
    ]
})
module.exports = result