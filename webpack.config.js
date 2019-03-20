const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//参考https://vue-loader.vuejs.org/zh/guide/
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',

    entry: ('./index.js'),
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        // contentBase: path.join(__dirname,'dist'),加了HtmlWebpackPlugin后好像这个并没有什么卵用了
        port: 9999,
        host: '0.0.0.0',
        hot: true
        // index: 'index.html'
    },
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
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
						limit: 1024 * 50
					}
				}]
			},
        ],
       
    },
     // 输出 source-map 方便直接调试 ES6 源码
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'blog',
            filename: 'index.html',
            template: './template.html'
        }),
        new VueLoaderPlugin()
    ]
}