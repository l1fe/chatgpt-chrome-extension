const path = require('path');

module.exports = {
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    devServerConfig.devMiddleware.writeToDisk = true;

    return devServerConfig;
  },
  webpack: {
    configure: (webpackConfig, { paths }) => {
      // Find instance of HTML Webpack plugin
      const pluginInstance = webpackConfig.plugins.find(
        plugin => plugin.constructor.name === 'HtmlWebpackPlugin'
      );

      if (pluginInstance) {
        // Exclude content and background scripts from index.html
        pluginInstance.userOptions.excludeChunks = ['content', 'background'];
      }

      return {
        ...webpackConfig,
        entry: {
          main: paths.appIndexJs,
          content: './src/scripts/content/index.ts',
          background: './src/scripts/background/index.ts'
        },
        output: {
          ...webpackConfig.output,
          filename: ({ chunk }) => {
            if (['content', 'background'].includes(chunk.name)) {
              return 'static/js/[name].js';
            }

            return 'static/js/[name].[contenthash].js';
          },
        },
      };
    },
  }
};
