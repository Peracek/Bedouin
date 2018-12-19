const path = require('path')
const fs = require('fs')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const WebpackNodeUtilsRunner = require('webpack-node-utils')
  .WebpackNodeUtilsRunner

const IS_DEV = process.env.NODE_ENV === 'development'

module.exports = {
  target: 'node',
  mode: process.env.NODE_ENV,
  externals: fs
    .readdirSync('node_modules')
    .concat(fs.readdirSync('gopher-transpiled'))
    .filter((folder) => ['.bin'].indexOf(folder) === -1)
    .reduce((acc, mod) => ({ ...acc, [mod]: `commonjs ${mod}` }), {}),
  
  entry: path.resolve(__dirname, 'src/server/index.ts'),

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    publicPath: '/'
  },

  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        query: {
          configFileName: 'src/server/tsconfig.json',
          reportFiles: ['src/server/**/*.ts']
        }
      }
    ]
  },

  resolve: {
    modules: [
      'node_modules',
      'gopher-transpiled',
      path.resolve(__dirname, 'src/server')
    ],
    extensions: ['.ts', 'tsx', '.js'],
    plugins: [new TsconfigPathsPlugin({ configFile: "./src/server/tsconfig.json" })]
  },

  devtool: 'sourcemap',
  stats: 'minimal',

  plugins: [
    // TODO: below
    // new webpack.BannerPlugin({
    //   banner: 'require("source-map-support").install();',
    //   raw: true,
    //   entryOnly: false,
    // }),
    IS_DEV && new WebpackNodeUtilsRunner('index.js'),
  ],
}