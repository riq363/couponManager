var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var WebpackErrorNotificationPlugin = require('webpack-error-notification');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: 'source-map',
    entry: {
        app: './client/react/index.jsx',
        //test: './client/react/login.jsx'

    },
    output: {
        path: __dirname,
        filename: "build/js/[name].js",
        library: "[name]"
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new WebpackErrorNotificationPlugin(/* strategy */ /* options */),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development,
            // ./public directory is being served
            host: 'localhost',
            index: "app.html",
            port: 8080,
            server: { baseDir: ['build']},
            open: false,
            ghostMode: false,
        }),
        new ExtractTextPlugin('./build/css/bundle.css')
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
            },
            {
                test: /\.html?$/,
                loader: 'file-loader'
            },
            {
                test: /\.scss$/,
                // loader: ExtractTextPlugin.extract('style-loader','css-loader!sass')
                loader: 'style-loader!css-loader?-minimize&modules&localIdentName=[name]-[local]--[hash:base64:5]&sourceMap!sass'
            }
        ]
    },
    resolve: {
      resolve: {
          extensions: ['', '.js', '.jsx']
      },
      modulesDirectories: [
          'node_modules',
          'client/modules'
      ]
    }
};
