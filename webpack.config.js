const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  watch: true,
  watchOptions: {
    ignored: ['node_modules/**']
  },
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 8080
  },
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}
