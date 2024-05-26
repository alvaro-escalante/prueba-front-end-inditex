// Configuracion comun para desarrollo y produccion
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import EslintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { paths } from './paths.js';

export default {
  context: paths.root,
  target: 'web',
  entry: resolve(paths.src, 'index.tsx'),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/inline',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@src': paths.src,
      '@assets': resolve(paths.src, 'assets'),
      '@adapters': resolve(paths.src, 'adapters'),
      '@application': resolve(paths.src, 'application'),
      '@domain': resolve(paths.src, 'domain'),
      '@presentation': resolve(paths.src, 'presentation'),
      '@components': resolve(paths.src, 'presentation/components'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(paths.public, 'index.html'),
      filename: 'index.html',
    }),
    new EslintPlugin({
      extensions: ['ts', 'tsx', 'js'],
      exclude: 'node_modules',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
    }),
  ],
};
