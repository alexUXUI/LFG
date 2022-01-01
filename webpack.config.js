const path = require("path");

const devServer = {
  port: 8082,
  hot: true, // enables HMR
  open: true,
};

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.mp3$/,
        loader: "file-loader",
      },
    ],
  },
  devServer,
  devtool: "source-map", // high quality source maps
};
