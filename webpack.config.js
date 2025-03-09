const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './src/scripts/main.ts',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: isProduction ? './' : '/',
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name][ext]',
          },
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        minify: isProduction,
        filename: 'index.html',
      }),
      ...(isProduction ? [new MiniCssExtractPlugin({
        filename: 'styles/[name].css',
      })] : []),
      new CopyWebpackPlugin({
        patterns: [
          { 
            from: 'src/assets', 
            to: 'assets',
            noErrorOnMissing: true
          },
          {
            from: 'src/styles',
            to: 'styles',
            noErrorOnMissing: true
          },
          {
            from: 'CNAME',
            to: '',
            noErrorOnMissing: true
          }
        ],
      }),
    ],
    devServer: {
      static: [
        {
          directory: path.join(__dirname, 'dist'),
        },
        {
          directory: path.join(__dirname, 'src'),
          publicPath: '/src'
        }
      ],
      compress: true,
      port: 9000,
      hot: true,
      open: true,
    },
    optimization: {
      minimize: isProduction,
    },
  };
}; 