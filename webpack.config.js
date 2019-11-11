const dev = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
const path = require("path");
const {
  BundleAnalyzerPlugin
} = require("webpack-bundle-analyzer");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const plugins = [
  new FriendlyErrorsWebpackPlugin(),
  new webpack.DefinePlugin({
    __isBrowser__: "true"
  })
];

if (!dev) {
  plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: "static",
    reportFilename: "webpack-report.html",
    openAnalyzer: false,
  }));
}

module.exports = {
  mode: dev ? "development" : "production",
  context: path.join(__dirname, "views"),
  devtool: dev ? "none" : "source-map",
  entry: {
    app: "./client.js",
  },
  resolve: {
    modules: [
      path.resolve("./views"),
      "node_modules",
    ],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: "babel-loader",
    }, ],
  },
  output: {
    path: path.resolve(__dirname, "assets"),
    filename: "[name].bundle.js",
  },
  plugins,
};