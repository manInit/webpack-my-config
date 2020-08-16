const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

//оптимизация
const optimization = () => {
  const config = {
    //обединить одинаковые иморты
    splitChunks: {
      chunks: 'all'
    }
  }
  //минифицировать файлы в prod режиме
  if (!isDev) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config;
}

const jsLoader = () => {
  const loaders = ['babel-loader']

  if (isDev) loaders.push('eslint-loader');

  return loaders;
}
const styleLoader = (...extra) => {
  let loaders = [MiniCssExtractPlugin.loader, 'css-loader'];
  if (extra) loaders = loaders.concat(extra)

  return loaders;
}

module.exports = {
  //где лежат исходники
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  //точки входа
  entry: {
    main: './index.js',
    // analytics: './analytics.js'
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    //расширения по умолчанию (который понимает webpack чтобы не писать .ext при import)
    // extensions: ['.js', '.css', '.png']
    //alias для пути
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  //объединить одинаковые импорты (подключение одинаковых библиотек в разных точках входах например)
  optimization: optimization(),
  //автообновление браузера (складывает бандлы в оп)
  devServer: {
    port: 4200
  },
  plugins: [
    //автоматическое подключение скриптов
    new HTMLWebpackPlugin({
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: filename('.css')
    }),
    //очистка папки dist
    new CleanWebpackPlugin()
  ],
  devtool: isDev ? 'source-map' : '',
  module: {
    rules: [
      // loaders
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.js$/,
        exclude: '/node_modules/',
        use: jsLoader()
      },
      {
        test: /\.css$/,
        // <-
        //MiniCssPlugin отдельный файл css
        //style-loader import styles into the dom
        use: styleLoader()
      },
      {
        test: /\.s[ca]ss$/i,
        use: styleLoader('sass-loader')
      },
      {
        test: /\.less$/,
        use: styleLoader('less-loader')
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        use: ['file-loader']
      },
      //loader for fonts
      {
        test: /\.(ttf|woff2?|eon)$/,
        use: ['file-loader']
      }
    ]
  }
}