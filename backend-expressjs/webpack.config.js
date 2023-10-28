 // webpack.config.js
 const path = require('path');

 module.exports = {
   target: 'node', 
   entry: './app.js', 
   output: {
     filename: 'bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
   // Additional configuration goes here
    // rules: [
    //     {
    //       test: /\.js$/,
    //       exclude: /node_modules/,
    //       use: 'babel-loader',
    //     },
    // ],
 };