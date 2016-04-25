const path = require("path")
// const webpack = require("webpack")

const reactExternal = {
  root: "React",
  commonjs2: "react",
  commonjs: "react",
  amd: "react",
}

const config = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "dist/",
    filename: "react-rails-form-helpers.js",
    library: "ReactRailsFormHelpers",
    libraryTarget: "umd",
  },
  externals: {
    "react": reactExternal,
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel" },
    ],
  },
  resolve: {
    root: [ path.resolve("./src") ],
    extensions: [ "", ".js", ".jsx" ],
  },
  plugins: [],
}

// config.output.filename = "react-rails-form-helpers.min.js"
// config.output.sourceMapFilename = "react-rails-form-helpers.sourcemap.js"
//
// config.plugins.push(new webpack.optimize.UglifyJsPlugin({
//   compress: {
//     warnings: false,
//   },
//   mangle: {
//     except: [ "React", "ReactRailsFormHelpers" ],
//   },
// }))

module.exports = config
