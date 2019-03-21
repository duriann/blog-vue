const HtmlWebpackPlugin = require('html-webpack-plugin')
//参考https://vue-loader.vuejs.org/zh/guide/
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {

    entry: ('./index.js'),

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
    plugins: [
        new HtmlWebpackPlugin({
            title: 'blog',
            filename: 'index.html',
            template: './template.html'
        }),
        new VueLoaderPlugin()

    ]
}