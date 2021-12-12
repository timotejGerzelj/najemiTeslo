const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
const Dotenv = require('dotenv-webpack')

const isDev = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDev ? 'development' : 'production',
  stats: {
    colors: true,
    preset: 'minimal',
  },
  performance: { hints: isDev ? false : 'warning' },
  entry: [path.resolve(__dirname, 'src/scripts/index.js'), path.resolve(__dirname, 'src/styles/index.css')],
  output: {
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    path: path.resolve(__dirname, '_site'),
    publicPath: '/',
  },
  plugins: [
    new WebpackManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash].css',
    }),
    new Dotenv()
  ],
  ...(!isDev && {
    optimization: {
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
  }),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|webp|avif|gif|svg)$/i,
        type: 'asset',
        generator: {
          filename: `${isDev ? '[name][ext]' : '[contenthash][ext]'}`,
        },
      },
      {
        test: /\.(woff|woff2|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: `${isDev ? '[name][ext]' : '[contenthash][ext]'}`,
        },
      },
    ],
  },
  resolve: {
    alias: {
      // Helpful alias for importing public assets
      public: path.resolve(__dirname, 'src/public'),
      '@helpers': path.resolve(__dirname, 'src/scripts/helpers'),
      '@components': path.resolve(__dirname, 'src/scripts/components'),
      '@data': path.resolve(__dirname, 'src/_data'),

    },
  },
}
