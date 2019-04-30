const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require('webpack')
const path = require('path')
function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    entry: ('./src/main.js'),
    resolve: {
        extensions: ['.js','.vue','.json'],
        alias: {
            '@': resolve('src')
        }
    },
    externals: {
        // 键：表示 导入包语法 from 后面跟着的名称
        // 值：表示 script 引入JS文件时，在全局环境中的变量名称
        vue: 'Vue',
        vuex: 'Vuex',
        axios: 'axios',
        'vue-router': 'VueRouter',
        // 注意：带有样式文件的第三方包，需要在 代码中 将样式注释掉
        'vue-quill-editor': 'VueQuillEditor',
        'quill-image-resize-module': 'ImageResize',
        'moment': 'moment',
        'element-ui': 'ELEMENT',
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: [
                    process.env.NODE_ENV !== 'production'? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader','postcss-loader','less-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/,
                use: ['babel-loader'],
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
				test: /\.(jpg|gif|png|jpeg|svg|bmp)$/,
				use: [{
					loader: "url-loader",
					options: {
						//如果图片超过下面这个数据所标注的大小，那么图片将不会被转换成base64的格式，直接会将图片文件扔到dist目录里
                        limit: 1024 * 50,
                        name: "imgs/[name].[hash:7].[ext]",
					}
				}]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ],
       
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'blog',
            filename: 'index.html',
            template: './template.html',
        }),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            'window.Quill': 'quill/dist/quill.js',
            'Quill': 'quill/dist/quill.js'
        }),
    ]
}