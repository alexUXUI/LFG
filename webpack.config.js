const path = require("path");

const devServer = {
  port: 8082,
  hot: true, // enables HMR
  open: true,
};

module.exports = {
  mode: "development",
  entry: "./app.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    modules: ["node_modules", "./src"],
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.mp3$/,
        loader: "file-loader",
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: {
          loader: "style-loader",
          options: {
            modules: true,
            localIdentName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    ],
  },
  devServer,
  devtool: "source-map", // high quality source maps
};
