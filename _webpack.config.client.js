const path = require('path')
const proxyMiddleware = require('http-proxy-middleware')
const convert = require('koa-connect')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const history = require('connect-history-api-fallback')

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',

  entry: {
    index: './src/client/index.tsx'
  },

  output: {
    path: path.resolve(__dirname, 'build/public'),
    filename: 'main.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/, 
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        query: {
          configFileName: 'src/client/tsconfig.json',
          reportFiles: ['src/client/**/*.ts']
        }
      }
    ]
  },

  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src/client')],
    extensions: ['.ts', 'tsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: "./src/client/tsconfig.json" })]
  },


  serve: {
    content: [
      path.resolve(__dirname, './public'),
      // path.resolve(__dirname, 'node_modules'),
    ],
    devMiddleware: {publicPath: '/assets/'},
    port: 9000,
    add: (app, middleware, options) => {
      app.use(convert(proxyMiddleware('/api', { target: 'http://localhost:3001', ws: true })))
      app.use(convert(history()))
    }
  },
}