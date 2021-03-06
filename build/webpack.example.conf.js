
const path = require("path")
const webpack = require("webpack")
const merge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const pkg = require("../package.json")

const baseConfig = require("./webpack.base.conf")

function resolve (dir) {
  return path.join(__dirname, "..", dir)
}

module.exports = merge(baseConfig, {
  entry: resolve("example-src/entry.js"),
  output: {
    path: resolve("example-dist"),
    filename: "index.js",
  },
  resolve: {
    alias: {
      "vue-daum-postcode": resolve("src"),
    }
  },
})

module.exports.plugins = (module.exports.plugins || []).concat([
  new HtmlWebpackPlugin({
    title: `${pkg.title} - ${pkg.description}`,
    description: pkg.description,
    template: resolve("build/template.html"),
    filename: resolve("example-dist/index.html"),
  }),
])

if (process.env.NODE_ENV === "production") {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new UglifyJSPlugin({
      uglifyOptions: {
        ie8: true,
        ecma: 5,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ])
}
