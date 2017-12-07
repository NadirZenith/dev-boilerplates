var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
// const publicPath = paths.servedPath;
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
// const shouldUseRelativeAssetPaths = publicPath === './';
const shouldUseRelativeAssetPaths = true;
// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

// Note: defined here because it will be used more than once.
const cssFilename = 'static/css/[name].[contenthash:8].css';

// ExtractTextPlugin expects the build output to be flat.
// (See https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/27)
// However, our output is structured with css, js and media folders.
// To have this structure working with relative paths, we have to use custom options.
// const extractTextPluginOptions = shouldUseRelativeAssetPaths
//   ? {  Making sure that the publicPath goes back to to build folder.
//     publicPath: Array(cssFilename.split('/').length).join('../')
//   }
//   : {};

const extractTextPluginOptions = {};

module.exports = {
  devtool: 'hidden-source-map',

  entry: {
    app: ['./client/index.js'],
    vendor: ['react', 'react-dom']
  },

  output: {
    path: __dirname + '/dist/client/',
    filename: '[name].[chunkhash].js',
    publicPath: '/'
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
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: 'url-loader?limit=10000'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      },

      // The notation here is somewhat confusing.
      // "postcss" loader applies autoprefixer to our CSS.
      // "css" loader resolves paths in CSS and adds assets as dependencies.
      // "style" loader normally turns CSS into JS modules injecting <style>,
      // but unlike in development configuration, we do something different.
      // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
      // (second argument), then grabs the result CSS and puts it into a
      // separate file in our build process. This way we actually ship
      // a single CSS file in production instead of JS code injecting <style>
      // tags. If you use code splitting, however, any async bundles will still
      // use the "style" loader inside the async code so CSS from them won't be
      // in the main CSS file.
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(Object.assign({
          fallback: {
            loader: require.resolve('style-loader'),
            options: {
              hmr: false
            }
          },
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: shouldUseSourceMap
              }
            },
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
            //           '>1%',
            //           'last 4 versions',
            //           'Firefox ESR',
            //           'not ie < 9',  React doesn't support IE8 anyway
            //         ],
            //         flexbox: 'no-2009',
            //       }),
            //     ],
            //   },
            // },
          ]
        }, extractTextPluginOptions)),
        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', minChunks: Infinity, filename: 'vendor.js'}),
    new ExtractTextPlugin('app.[chunkhash].css', {allChunks: true}),
    new ManifestPlugin({basePath: '/'}),
    new ChunkManifestPlugin({filename: "chunk-manifest.json", manifestVariable: "webpackManifest"}),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  node: {
    fs: 'empty',
    fsevents: 'empty'
  }
};
