//postCss-loader config
module.exports = {
    // Add you postcss configuration here
    // Learn more about it at https://github.com/webpack-contrib/postcss-loader#config-files
    plugins: [
        require('autoprefixer'),
        // https://github.com/maximkoretskiy/postcss-autoreset
        require('postcss-autoreset')(),
        // https://github.com/maximkoretskiy/postcss-initial
        require('postcss-initial')({
            reset: 'inherited' // reset only inherited rules
        }),
        // https://purgecss.com/plugins/postcss.html#installation
        require('@fullhuman/postcss-purgecss')({
            content: ['./src/**/*.html']
        })
    ],
};
