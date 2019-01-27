const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/index.jsx',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.s?[ac]ss$/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.woff|.woff2|.ttf|.eot|.svg|.png|.jpg.*.$/,
                use: ['file-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
     plugins: [
         new webpack.HotModuleReplacementPlugin(),
         new MiniCssExtractPlugin({
             filename: 'estilo.css'
         })
     ],
    devServer: {
        contentBase: './public',
        hot: true
    }
};