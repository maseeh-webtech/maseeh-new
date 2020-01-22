const path = require("path");
const entryFile = path.resolve(__dirname, "src", "index.js");
const outputDir = path.resolve(__dirname, "dist");

const webpack = require("webpack");

module.exports = {
  entry: ["@babel/polyfill", entryFile],
  output: {
    path: outputDir,
    publicPath: "/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  // plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    port: 8080,
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    proxy: {
      "/api": "http://localhost:8081",
    },
  },
};
