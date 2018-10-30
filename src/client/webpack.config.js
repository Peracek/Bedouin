const path = require('path')
const proxyMiddleware = require('http-proxy-middleware')
const convert = require('koa-connect')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  mode: process.env.WEBPACK_SERVE ? 'development' : 'production',

  entry: path.resolve(__dirname, "index.tsx"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "../../build/client"),
    publicPath: "./assets/"
  },

  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: [new TsconfigPathsPlugin({ /*configFile: "./path/to/tsconfig.json" */ })]
},

module: {
  rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

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
      path.resolve(__dirname, '../../public'),
      // path.resolve(__dirname, 'node_modules'),
    ],
    devMiddleware: {publicPath: '/assets/'},
    port: 9000,
    add: (app, middleware, options) => {
      app.use(convert(proxyMiddleware('/api', { target: 'http://localhost:3001', ws: true })))
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