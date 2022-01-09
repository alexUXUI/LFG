const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const devServer = {
  port: 8082,
  hot: true, // enables HMR
  open: true,
  historyApiFallback: {
    index: "index.html",
  },
};

const PATHS = {
  src: path.join(__dirname, "src"), //absolute path to RepoDir/src
  dist: path.join(__dirname, "dist"), //absolute path to RepoDir/dist
};

module.exports = {
  mode: "development",
  // entry: ["regenerator-runtime/runtime.js", "./app/app.jsx"],
  entry: ["regenerator-runtime/runtime.js", "./main.js"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    modules: ["node_modules", "./src"],
    extensions: [".js", ".jsx", ".css"],
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
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              publicPath: "css",
              esModule: false,
            },
          },
        ],
      },
    ],
  },
  devServer,
  devtool: "source-map", // high quality source maps
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
