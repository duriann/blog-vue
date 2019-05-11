const path = require('path')
const base = require('./webpack.base.js')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')//清空dist
const MiniCssExtractPlugin = require("mini-css-extract-plugin")//提取css
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;//分析代码块大小
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');//删除console.log 压缩代码

let result =  merge(base,{
    mode: 'production',
    output: {
        path: path.join(__dirname,'../dist'),
        filename: 'js/[name].[contenthash].js'//只有内容改变名称才变
    },
    
    optimization: {
        
        minimizer: [new UglifyJsPlugin({
            uglifyOptions:{
                //删除注释
                output:{
                    comments:false
                },
                //删除console 和 debugger  删除警告
                compress:{
                    warnings:false,
                    drop_debugger:true,
                    drop_console:true
                }
        }
        })],
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