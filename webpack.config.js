const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './index.js'],
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'react-redux': {
      root: 'ReactRedux',
      commonjs2: 'react-redux',
      commonjs: 'react-redux',
      amd: 'react-redux',
    },
    redux: {
      root: 'Redux',
      commonjs2: 'redux',
      commonjs: 'redux',
      amd: 'redux',
    },
  },
  output: {
    filename: 'react-redux-modules.js',
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    library: 'ReactReduxModules',
    libraryTarget: 'umd',
  },
  context: path.resolve(__dirname, 'src'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};
