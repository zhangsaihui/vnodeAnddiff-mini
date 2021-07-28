/*
 * @Author: saihui
 * @Date: 2021-07-21 16:29:55
 * @LastEditTime: 2021-07-22 11:02:12
 * @LastEditors: saihui
 * @Description: 
 */
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath:"/js",
    filename: 'vue.js',
  },
  devtool:"inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
  },
};