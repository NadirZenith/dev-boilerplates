var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client', 'webpack/hot/only-dev-server', 'react-hot-loader/patch', './client/index.js'
    ],
    vendor: ['react', 'react-dom']
  },

  output: {
    path: __dirname,
    filename: 'app.js',
    publicPath: 'http://0.0.0.0:8000/'
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
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader turns CSS into JS modules that inject <style> tags.
      // In production, we use a plugin to extract that CSS to a file, but
      // in development "style" loader enables hot editing of CSS.
      {
        test: /\.css$/,
        use: [
          require.resolve('style-loader'), {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1
            }
          }
          // {
          //   loader: require.resolve('postcss-loader'),
          //   options: {
          //      Necessary for external CSS imports to work
          //      https://github.com/facebookincubator/create-react-app/issues/2677
          //     ident: 'postcss',
          //     plugins: () => [
          //       require('postcss-flexbugs-fixes'),
          //       autoprefixer({
          //         browsers: [
          //           '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9',  React doesn't support IE8 anyway
          //         ],
          //         flexbox: 'no-2009'
          //       })
          //     ]
          //   }
          // }
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
