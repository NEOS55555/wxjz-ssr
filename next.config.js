const path = require('path')
const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css');
const withPlugins = require("next-compose-plugins");
const { override, adjustStyleLoaders, addWebpackAlias } = require("customize-cra");

const PORT = 4567
module.exports = withPlugins([withSass,withCss], {
  webpack: override(addWebpackAlias({
    '@': path.resolve('src'),
  })),
  env: {
  	API_HOST: 'http://127.0.0.1',
    PORT
  }
});

