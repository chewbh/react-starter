const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const utils = require('./config/webpack.utils');

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  {
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
        title: 'react starter',
      }),
    ],
  },
  utils.lint({
    options: { emitWarning: true },
  }),
  // utils.css(),
  utils.cssModules(),
  utils.less(),
  utils.sass(),
  utils.fonts({
    options: {
      name: '[name].[ext]',
    },
  }),
]);

const productionConfig = merge([
  //
  utils.extractCSS({ use: 'css-loader', utils.autoprefix() }),
  // utils.purifyCSS({
  //   paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
  // }),
  utils.images({
    options: {
      limit: 25000,
      name: '[name].[ext]',
    },
  }),
]);

const developmentConfig = merge([
  utils.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  {
    devtool: 'cheap-eval-source-map',
  },
  utils.css(),
  utils.images(),
]);

module.exports = env => {
  console.log('environment:', env);
  if (env === 'production') return merge(commonConfig, productionConfig);
  return merge(commonConfig, developmentConfig);
};
