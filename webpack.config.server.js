const webpack = require('webpack')
const path = require('path')

console.log('process.env.WKS_DJANGO_URL: '+process.env.WKS_DJANGO_URL)

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'inline-source-map',
    output: {
        filename: 'main.js',
        path: path.resolve('./assets/bundles'),
        publicPath: '/static/frontend/',
    },
    devServer: {
        contentBase: path.resolve('./assets/bundles'),
        publicPath: '/static/frontend/',
        hot: true,
        proxy: {
        '!/static/frontend/**': {
            target: process.env.WKS_DJANGO_URL || 'http://localhost:8000',
            changeOrigin: true,
        },
        },
        open: true,
        openPage: ''
    },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  }
}