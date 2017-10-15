
const PurifyCSSPlugin = require('purifycss-webpack');


exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    host,
    port,
    overlay: {
      errors: true,
      warnings: true,
    },
    // hot: true,
    // publicPath: '/public/',
  },
});

exports.lint = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include,
        exclude,
        options,
      },
    ],
  },
});

// module: {
//   rules: [
//     {
//
//       test: /\.jsx?$/,
//       loader: 'eslint-loader',
//
//     },
//     {
//       test: /\.jsx?$/,
//       loader: 'babel-loader',
//     },
//   ],
// },

exports.purifyCSS = ({ paths }) => ({
  plugins: [
    new PurifyCSSPlugin({ paths }),
  ],
});

exports.extractCSS = ({ include, exclude, use }) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename: '[name].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: plugin.extract({
            use,
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [ plugin ],
  };
};

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer')(),
    ]),
  },
});

// @TODO revisit later with use for scss (sass)
exports.css = ({include, exclude} = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: [
          'style-loader',
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => ([
                require('autoprefixer'),
                require('precss'),
                require('postcss-cssnext')(),
              ]),
            },
          },
        ],
      },
    ]
  }
});

exports.cssModules = ({include, exclude} = {}) => ({
  module: {
    rules: [
      {
        test: /\.mcss$/,
        include,
        exclude,
        loader: 'css-loader',
        options: {
          modules: true,
        },
      },
    ]
  }
});

exports.less = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'resolve-url-loader', 'less-loader?sourceMap'],
      },
    ]
  }
});

exports.sass = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'],
      },
    ]
  }
});

// inline images below 25kb (default)
exports.images = ( {include, exclude, options} = {} ) => ({
  module: {
    rules: [
      {
        test: /\.(gif|jpg|png|svg)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options: {
            limit,
          },
        },
      },
    ]
  }
});

exports.fonts = ( {include, exclude, options} = {} ) => ({
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,
        use: {
          loader: 'file-loader',
          options,
        },
      },
    ]
  }
});
