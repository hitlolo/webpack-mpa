// Generated using webpack-cli http://github.com/webpack-cli

// merge multiple configuration files
const merge = require('webpack-merge');


const baseConfig = require('./webpack.config.base');
const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');


module.exports = (env,options) => {
    let devMode  = options.mode === 'development';
    let doConfig = devMode ? devConfig : prodConfig;
    return merge.merge(baseConfig(env,options),doConfig(env,options));
};


