var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client', 'webpack/hot/only-dev-server', 'react-hot-loader/patch', './client/src/index.js'
    ],
    vendor: ['react', 'react-dom']
  },

  output: {
    path: __dirname,
    filename: 'app.js',
    // publicPath: 'http://0.0.0.0:8000/'
  },

  resolve: {
    extensions: [
      '.js', '.jsx'
    ],
    modules: ['client', 'node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.jsx*$/,
        exclude: [
          /node_modules/, /.+\.config.js/
        ],
        loader: 'babel-loader'
      }, {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: 'url-loader?limit=10000'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        loader: 'file-loader',
      },
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'), {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', minChunks: Infinity, filename: 'vendor.js'}),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],

  node: {
    fs: 'empty'
  },

  performance: {
    hints: false
  }
};
