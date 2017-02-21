var webpack = require('webpack');
var PROD = JSON.parse(process.env.PROD_ENV || '0');

const plugins = [
    new webpack.ProvidePlugin({   
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery',
        _: 'underscore',
    }),
];

if (PROD) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    )
}

module.exports = {
    entry: "./src/client",
    output: {
        path: "./build",
        filename: PROD ? 'bundle.min.js' : 'bundle.js'
    },
    resolve: {
        extensions: ['', '.jsx', '.scss', '.js', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url'
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                loader: 'file'
            },
            {
                test: /\.json$/,
                loader: require.resolve('json-loader')
            },
            {
                test: /(\.scss|\.css)$/,
                loaders: [
                    require.resolve('style-loader'),
                    require.resolve('css-loader') + '?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
                ]
            },
            { 
                test: /(\.js|\.jsx)$/, 
                exclude: /node_modules/,
                loader: require.resolve('babel-loader'),
                query: { presets: ['es2015', 'react'] }
            }
        ]
    },
    plugins
}
