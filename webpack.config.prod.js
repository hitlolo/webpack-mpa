//production config
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = () => {
    return {
        optimization: {
            minimize: true,
            minimizer: [
                // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
                '...', new CssMinimizerPlugin(),
            ],
            // default options of webpack optimization:splitChunks
            // @more https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
            splitChunks: {
                // chunks: 'asyn', // default value
                chunks: 'all',
                minSize: 20000,
                minRemainingSize: 0,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                enforceSizeThreshold: 50000,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
        },
    };
    
};