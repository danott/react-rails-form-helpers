const path = require("path")
// const webpack = require("webpack")

const reactExternal = {
  root: "React",
  commonjs2: "react",
  commonjs: "react",
  amd: "react",
}

const config = {
  mode: "production",
  target: ["web", "es5"],
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "dist/",
    filename: "react-rails-form-helpers.js",
    library: "ReactRailsFormHelpers",
    libraryTarget: "umd",
    globalObject: "this",
  },
  externals: {
    "react": reactExternal,
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
    ],
  },
  resolve: {
    modules: [ path.resolve("./src"), "node_modules" ],
    extensions: [ ".js", ".jsx" ],
  },
  optimization: {
    minimize: false,
    // webpack 1 left process.env.NODE_ENV unset, so prop-types checks stayed
    // on in the dist bundle. Keep that behavior.
    nodeEnv: "development",
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
