// NODE file
var compressor = require('node-minify');

new compressor.minify({
    type: 'uglifyjs',
    fileIn: 'lib/slider.js',
    fileOut: 'dist/slider.min.js',
    callback: function(err, min){
        if(!err) console.log("JS minified.");
        else console.log(err)
    }
});

new compressor.minify({
    type: 'clean-css',
    fileIn: 'styles/slider.css',
    fileOut: 'dist/slider.min.css',
    callback: function(err, min){
        if(!err) console.log("CSS minified.");
        else console.log(err)
    }
});
