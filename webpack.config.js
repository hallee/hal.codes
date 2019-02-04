const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const mode = process.env.NODE_ENV !== 'development' ? 'production' : 'development'

function commonConfig(babelLoader, output) {
  return {
    mode: mode,
    entry: ['./Frontend/Sass/normalize.scss', './Frontend/index.js'],
    output,
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
        babelLoader,
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            productionMode: mode === 'production'
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
      minimize: true
    },
    plugins: [
      new VueLoaderPlugin(),
      new CompressionPlugin({
        algorithm: 'gzip'
      })
    ]
  }
}

const modernConfig = commonConfig(
  {
    test: /\.m?js$/i,
    exclude: file => (
      /node_modules/.test(file) &&
      !/\.vue\.js/.test(file)
    ),
    use: {
      loader: 'babel-loader',
      options: {
        envName: 'modern'
      }
    }
  },
  {
    path: path.resolve(__dirname, 'Public/scripts/'),
    publicPath: '/scripts/',
    filename: 'bundle.mjs'
  }
)

const legacyConfig = commonConfig(
  {
    test: /\.js$/i,
    exclude: file => (
      /node_modules/.test(file) &&
      !/\.vue\.js/.test(file)
    ),
    use: {
      loader: 'babel-loader',
      options: {
        envName: 'legacy'
      }
    }
  },
  {
    path: path.resolve(__dirname, 'Public/scripts/'),
    publicPath: '/scripts/',
    filename: 'bundle.js'
  }
)

module.exports = [legacyConfig, modernConfig]