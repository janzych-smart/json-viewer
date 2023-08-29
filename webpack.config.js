const path = require('path');

module.exports = {
	mode: 'production',
    entry: {
        jsonViewer: './dist/json-viewer.js',
    },
    target: ['web', 'es5'],
    resolve: {
        extensions: [ '.js' ]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist')
    },
};
