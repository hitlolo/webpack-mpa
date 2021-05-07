//development config
const path = require('path');

module.exports = () => {
    return {
        devtool: 'eval-source-map',
        devServer: {
            host: 'localhost',
            contentBase: path.join(__dirname, 'dist'),
            port: 9000,
            compress: true,
            open: true,
            hot: true,
            index: 'index.html',
            watchContentBase: true,
            //make html files reload by browser
            /*
            * Warning webpack-dev-server doesn't write any output files after compiling. 
            * Instead, it keeps bundle files in memory and serves them as if they were real files mounted at the server's root path. 
            * If your page expects to find the bundle files on a different path, 
            * you can change this with the publicPath option in the dev server's configuration.
            * 
            * for this reason,write html changes to disk to fire reload
            */
            writeToDisk: (filePath) => {
                return /\.html$/.test(filePath);
            },
        },
    };
    
};