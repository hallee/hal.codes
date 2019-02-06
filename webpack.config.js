const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const mode = process.env.NODE_ENV !== 'development' ? 'production' : 'development'

module.exports = {
  mode: mode,
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
              minimize: { safe: true }
            }
          },
          { 
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'Frontend/Sass'),],
              data: '@import "../Sass/mixins.scss";'
            } 
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          productionMode: mode === 'production'
        }
      },
      {
        test: /\.js$/i,
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        ),
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',          
            options: {
              productionMode: mode === 'production'
            }
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
    minimizer: [new TerserPlugin({
      parallel: true,
      terserOptions: {
        compress: {
          booleans: true,
          if_return: true,
          sequences: true,
          unused: true,
          conditionals: true,
          dead_code: true,
          evaluate: true
        },
      }
    })]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip'
    })
  ]
}