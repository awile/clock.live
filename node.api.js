
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');
const currentYear = new Date().getFullYear();

export default () => ({
  webpack: (config) => {
    const customPlugins = [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new MomentTimezoneDataPlugin({
        startYear: currentYear,
        endYear: currentYear,
     }),
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'static'
      // })
    ];
    config.plugins = config.plugins.concat(customPlugins);
    return config;
  }
})
