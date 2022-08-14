const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const webpack = require("webpack");
const path = require("path");


const nextConfig = {
  webpack(config, options) {
    config.resolve.modules.push(path.resolve("./"));
    return config;
  },
  images: {
    domains: ['dhj9tilaog5bs.cloudfront.net']
  }
}

module.exports = withPlugins([[withSass], [withImages], [withCSS]], nextConfig);
