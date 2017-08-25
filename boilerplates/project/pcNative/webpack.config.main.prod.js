import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';


export default merge.smart(baseConfig, {
  devtool: 'source-map',
  target: 'electron-main',
  entry: './app/main.dev',

  output: {
    path: __dirname,
    filename: './app/main.prod.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      'process.env.DEBUG_PROD': JSON.stringify(process.env.DEBUG_PROD || 'false')
    })
  ],
  node: {
    __dirname: false,
    __filename: false
  },
});
