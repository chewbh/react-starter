const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = {
  // context: __dirname,
  // entry: [
  // 'react-hot-loader/patch',
  // 'webpack-dev-server/client?http://localhost:8080',
  // 'webpack/hot/only-dev-server',
  // './js/ClientApp.jsx',

  // ],
  entry: { app: PATHS.src },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    // publicPath: '/public/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'xxxxxxx',
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
        // exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
    ],
  },
};

const productionConfig = () => commonConfig;
const developmentConfig = () => {
  const config = {
    devtool: 'cheap-eval-source-map',
    devServer: {
      historyApiFallback: true,
      stats: 'errors-only',
      host: process.env.HOST || '0.0.0.0',
      port: process.env.PORT,

      overlay: {
        errors: true,
        warnings: true,
      },
      // hot: true,
      // publicPath: '/public/',
    },
  };
  return Object.assign({}, commonConfig, config);
};

module.exports = env => {
  console.log('environment:', env);
  if (env === 'production') return productionConfig();
  return developmentConfig();
};
