const path = require('path')
const proxyMiddleware = require('http-proxy-middleware')
const convert = require('koa-connect')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const history = require('connect-history-api-fallback')

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',

  entry: path.resolve(__dirname, "src/client/index.tsx"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build/client"),
    publicPath: "/"
  },

  devtool: "source-map",

  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src/client')],
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./src/client/tsconfig.json" })]
},

module: {
  rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {         
        test: /\.tsx?$/, 
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        query: {
          configFileName: 'src/client/tsconfig.json',
          reportFiles: ['src/client/**/*.ts']
        } 
      },
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
  ]
},

// When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
  //   externals: {
  //     "react": "React",
  //     "react-dom": "ReactDOM"
  // },

  serve: {
    content: [
      path.resolve(__dirname, 'public'),
      // path.resolve(__dirname, 'node_modules'),
    ],
    devMiddleware: {publicPath: '/'},
    port: 9000,
    add: (app, middleware, options) => {
      app.use(convert(proxyMiddleware('/api', { target: 'http://localhost:3001', ws: true })))
      app.use(convert(history()))
    }
  },

  // devServer: {
  //   contentBase: [
  //     path.resolve(__dirname, 'public'),
  //     path.resolve(__dirname, 'node_modules'),
  //   ],
  //   compress: true,
  //   port: 9000
  // }
}