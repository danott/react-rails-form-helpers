var path = require("path")
var reactExternal = {
  root: "React",
  commonjs2: "react",
  commonjs: "react",
  amd: "react"
}

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "dist/",
    filename: "react-rails-form-helpers.js",
    library: "ReactRailsFormHelpers",
    libraryTarget: "umd"
  },
  externals: {
    "react": reactExternal
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel" }
    ]
  },
  resolve: {
    root: [
      path.resolve("./src")
    ],
    extensions: ["", ".js", ".jsx"]
  }
}
