// Configuración solo para development
import { merge } from 'webpack-merge';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import commonConfig from './webpack.common.js';
import EslintPlugin from 'eslint-webpack-plugin';
import { paths } from './paths.js';

export default merge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    filename: '[name].[fullhash].js',
    publicPath: '/',
  },
  plugins: [
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    new EslintPlugin({
      extensions: ['ts', 'tsx', 'js'],
      fix: true,
      exclude: 'node_modules',
    }),
  ].filter(Boolean),
  stats: {
    colors: true,
    entrypoints: false,
    children: false,
    modulesSpace: 0,
    hash: false,
    version: true,
    timings: false,
    assets: false,
    chunks: false,
    errors: true,
  },
  devServer: {
    open: true,
    port: 3000,
    hot: true,
    host: 'localhost',
    static: {
      directory: paths.public,
    },
    client: {
      logging: 'error',
      progress: true,
      overlay: {
        errors: true,
        runtimeErrors: true,
        warnings: false,
      },
    },
    historyApiFallback: true,
  },
});
