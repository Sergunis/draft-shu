const path = require("path")

module.exports = {
  entry: [
    "./src/index.js"
  ],
  output: {
    path: __dirname,
    path: path.resolve(__dirname, 'public'),
    filename: "bundle.js"
  },
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"]
          }
        }

      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000
  }
};