const path = require("path");

const devServer = {
  port: 8082,
  hot: true, // enables HMR
  open: true,
  historyApiFallback: {
    index: "index.html",
  },
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
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer,
  devtool: "source-map", // high quality source maps
};
