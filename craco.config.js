const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
module.exports = {
  eslint: {
    pluginOptions: (config) => {
      config.exclude = ['**/node_modules/**', '**/virtual:windi-devtools*']
      return config
    },
  },
  webpack: {
    plugins: {
      add: [
        new WindiCSSWebpackPlugin({
          virtualModulePath: 'src',
        }),
      ],
    },
  },
}
