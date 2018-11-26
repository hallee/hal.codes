const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  entry: ['./Frontend/Sass/normalize.scss', './Frontend/index.js'],
  output: {
    path: path.resolve(__dirname, 'Public/scripts/'),
    publicPath: '/scripts/',
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: {
                  safe: true
              }
            }
          },
          { 
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'Frontend/Sass'),]
            } 
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader'
          },
          {
            loader: 'vue-markdown-loader/lib/markdown-compiler',
            options: {
              raw: true
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip'
    })
  ]
}