const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CompressionPlugin = require("compression-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
  entry: ['./Frontend/index.js', './Frontend/Sass/normalize.scss', './Frontend/Sass/style.scss'], // TODO: move styles to .vue
  output: {
    path: path.resolve(__dirname, 'Public/scripts/'),
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
          {
            loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: './Public/styles/'
              }
          },
          {
            loader: "css-loader",
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
    }),
    new MiniCssExtractPlugin({
      filename: '../styles/style.css'
    })
  ]
}