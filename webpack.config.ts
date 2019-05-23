import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

const config = function(env: any) : webpack.Configuration {
  return {
    mode: env.production ? 'production' : 'development',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          loader: 'url-loader',
          options: {
            limit: 10 * 1024 // 10 KB
          }
        },
        {
          test: /\.svg$/,
          loader: 'svg-loader',
          options: {
            limit: 10 * 1024, // 10 KB
            noquotes: true
          }
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          loader: 'image-webpack-loader',
          enforce: 'pre',
          options: {
            bypassOnDebug: true
          }
        }
      ]
    },
    resolve: {
      extensions: [ '.ts', '.js' ]
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
          { from: 'src/assets/img/', to: 'assets/img' },
        ]),
        new HtmlWebpackPlugin({
          template: '!!ejs-webpack-loader!src/index.ejs',
          minify: {
            minifyCSS: true
          },
          cache: true
        }),
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css'
        }),
        new FaviconsWebpackPlugin({
          logo: './src/assets/img/favicon.png',
          title: 'Portfólio | Rony Mesquita da Silva',
          inject: true // Integrates with html-webpack-plugin
        })
    ]
  }
};

export default config;
