var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var project = require('./project.config');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/script.js",
  output: {
    path: __dirname + "/dist",
    filename: "script.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      sourcemap: false
    }),
  ],
};