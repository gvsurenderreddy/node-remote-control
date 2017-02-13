var path = require('path');

module.exports = {
  entry: './public/app.js',
  output: {
    path: 'public/build/',
    filename: 'bundle.js'
  },  
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        loader: 'babel-loader', 
        query: {
          presets: ['es2015']
        } 
      }
    ]
  }
};