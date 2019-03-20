const path = require('path')

module.exports = {
    mode: 'development',

    entry: ('./index.js'),
    output: {
        path: path.join(__dirname,'dist'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: ['style-loader','css-loader','less-loader']
            }
        ]
    }
}