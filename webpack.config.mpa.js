// multiple page application
// to generate html
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
// const path = require('path');

const { entry,htmlWebpackPlugins } = (function(){
    // const entryFiles = glob.sync(path.join(__dirname, './src/pages/*/index.js'));
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync( './src/pages/*/index.js');
    entryFiles.forEach((file)=>{
        const match = file.match(/src\/pages\/(.*)\/index\.js/);
        if(match !== null){
            const pageName = match[1];
            entry[pageName] = file;
            htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: `./src/pages/${pageName}/index.pug`,
                    filename: `${pageName}.html`,
                    chunks: [pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: true,
                        preserveLineBreaks: true,
                        minifyCSS: true,
                        minifyJS: true,
                        removeComments: true,
                    },
                })
            );
        }
    });
    return {
        entry,
        htmlWebpackPlugins
    };
})();

module.exports = {
    entry,
    htmlWebpackPlugins
};