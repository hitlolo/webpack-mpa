//base config
const path = require('path');
// access built-in plugins, use progress reporter
const { ProgressPlugin } = require('webpack');

/* 
webpack@5 update, use output.clean instead
to clean dist folder when build 
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
*/

// extract css into chunk files
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// multiple page html appliction's entry and html files
const multiplePageApp = require('./webpack.config.mpa');


// folders of static assets
const assetFolder = 'assets';
const jsFolder = `${assetFolder}/js`;
const imgFolder = `${assetFolder}/img`;
const cssFolder = `${assetFolder}/css`;
const fontFolder = `${assetFolder}/fonts`;

module.exports = (env,options) => {
    let devMode  = options.mode === 'development';
    return {
        mode: options.mode,
        entry: multiplePageApp.entry,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: devMode ? `${jsFolder}/[name].bundle.js` : `${jsFolder}/[name].[contenthash].js`,
            clean: true
        },
        module: {
            rules: [
                {
                    test: require.resolve('jquery'),
                    loader: 'expose-loader',
                    options: {
                        exposes: ['$', 'jQuery'],
                    },
                },
                {
                    test: /\\.(js|jsx)$/,
                    exclude: /node_modules/,
                    include: path.resolve(__dirname, 'src'),
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                },
                // {
                //     test: /\.html$/,
                //     loader: 'html-loader',
                // },
                {
                    test: /\.pug$/,
                    use: [
                        {
                            loader: 'html-loader',
                            options: {
                                minimize: !devMode,
                            }
                        },
                        {
                            loader:'pug-html-loader',
                        },
    
                    ],
                },
                {
                    test: /\.styl$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader', 
                        'postcss-loader', 
                        'stylus-loader'
                    ],
                },
                {
                    test: /\.css$/i,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 
                        'css-loader', 
                        'postcss-loader'
                    ],
                },
                // font
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: `${fontFolder}/[hash][ext]`
                    }
                },
                // image
                {
                    test: /\.(png|jpg|gif|webp)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: `${imgFolder}/[hash][ext]`
                    }
                },
    
                // Add your rules for custom modules here
                // Learn more about loaders from https://webpack.js.org/loaders/
            ],
          
        },
        plugins: [
            new ProgressPlugin(),
            // webpack@5 update
            // new CleanWebpackPlugin(), 
            new MiniCssExtractPlugin({
                filename: devMode ? `${cssFolder}/[name].css` : `${cssFolder}/[name].[contenthash:8].css`,
                chunkFilename:  devMode ? `${cssFolder}/[name].[id].css` : `${cssFolder}/[name].[id].[contenthash:8].css`,
            }),
            ...multiplePageApp.htmlWebpackPlugins
        
            // Add your plugins here
            // Learn more obout plugins from https://webpack.js.org/configuration/plugins/
        ]
    };
    
};